import delay from 'delay'
import got from 'got'
import ms from 'ms'
import pTimeout from 'p-timeout'

import * as types from './types'
import * as utils from './utils'

export class ReplicateAPI {
  protected _apiBaseUrl: string
  protected _headers: Record<string, string>
  protected _pollingIntervalMs: number
  protected _timeoutMs: number

  constructor(
    opts: {
      apiBaseUrl?: string
      apiToken?: string
      timeoutMs?: number
      pollingIntervalMs?: number
    } = {}
  ) {
    const {
      apiBaseUrl = 'https://api.replicate.com/v1',
      apiToken = process.env.REPLICATE_API_TOKEN,
      timeoutMs = 10 * 60 * 1000, // 10 minutes
      pollingIntervalMs = 2000
    } = opts

    this._apiBaseUrl = apiBaseUrl
    this._headers = {
      Authorization: `Token ${apiToken}`,
      'Content-Type': 'application/json'
    }

    this._timeoutMs = timeoutMs
    this._pollingIntervalMs = pollingIntervalMs
  }

  async getModel(modelId: string): Promise<types.Model> {
    return this._get<types.Model>(`/models/${modelId}`)
  }

  async getPrediction(id: string): Promise<types.Prediction> {
    return this._get<types.Prediction>(`/predictions/${id}`)
  }

  async createPrediction({
    modelVersion,
    input,
    webhook
  }: {
    modelVersion: string
    input: any
    webhook?: string
  }): Promise<types.Prediction> {
    return this._post<types.Prediction>('/predictions', {
      input,
      version: modelVersion,
      webhook
    })
  }

  async createAndResolvePrediction({
    modelVersion,
    input,
    webhook,
    ...opts
  }: {
    modelVersion: string
    input: any
    webhook?: string
    timeoutMs?: number
    pollingIntervalMs?: number
  }): Promise<types.Prediction> {
    const prediction = await this.createPrediction({
      modelVersion,
      input,
      webhook
    })

    if (utils.isPredictionResolved(prediction)) {
      return prediction
    }

    return this.resolvePrediction(prediction.id, {
      ...opts,
      initialDelay: true
    })
  }

  /**
   * Polls the status of a prediction until it resolves.
   */
  async resolvePrediction(
    id: string,
    opts: {
      timeoutMs?: number
      pollingIntervalMs?: number
      initialDelay?: boolean
    } = {}
  ): Promise<types.Prediction> {
    const {
      timeoutMs = this._timeoutMs,
      pollingIntervalMs = this._pollingIntervalMs,
      initialDelay = false
    } = opts

    let prediction: types.Prediction
    let isInitialRequest = true
    let isCanceled = false

    const resolvedPredictionP = new Promise<types.Prediction>(
      async (resolve, reject) => {
        do {
          if (isCanceled) {
            return reject(`prediction error ${id}: timeout ${ms(timeoutMs)}`)
          }

          if (initialDelay || !isInitialRequest) {
            // sleep longer if the model is still starting
            const sleepDurationMs =
              prediction?.status === 'starting'
                ? Math.min(pollingIntervalMs * 10, 5000)
                : pollingIntervalMs

            await delay(sleepDurationMs)
          }

          if (isCanceled) {
            return reject(`prediction error ${id}: timeout ${ms(timeoutMs)}`)
          }

          prediction = await this.getPrediction(id)
          if (utils.isPredictionResolved(prediction)) {
            return resolve(prediction)
          }

          isInitialRequest = false
        } while (true)
      }
    )

    ;(resolvedPredictionP as any).cancel = () => {
      isCanceled = true
    }

    return pTimeout(resolvedPredictionP, {
      milliseconds: timeoutMs,
      message: `prediciton error ${id}: timeout ${ms(timeoutMs)}`
    })
  }

  async cancelPrediction(id: string) {
    return this._post<types.Prediction>(`/predictions/${id}/cancel`)
  }

  _get<T>(pathname: string) {
    const url = `${this._apiBaseUrl}${pathname}`
    console.warn('GET', url)
    return got(url, { headers: this._headers }).json<T>()
  }

  _post<T>(pathname: string, body?: any) {
    const url = `${this._apiBaseUrl}${pathname}`
    console.warn('POST', url, body)
    return got.post(url, { headers: this._headers, json: body }).json<T>()
  }
}

// TODO
export class ReplicateModel {
  protected _api: ReplicateAPI

  constructor(api: ReplicateAPI) {
    this._api = api
  }
}
