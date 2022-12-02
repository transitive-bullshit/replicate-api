import delay from 'delay'
import got, { Options as GotOptions } from 'got'
import ms from 'ms'
import pTimeout from 'p-timeout'

import * as types from './types'
import * as utils from './utils'

export class ReplicateAPI {
  protected _apiBaseUrl: string
  protected _headers: Record<string, string>

  constructor(
    opts: {
      apiBaseUrl?: string
      apiToken?: string
    } = {}
  ) {
    const {
      apiBaseUrl = 'https://api.replicate.com/v1',
      apiToken = process.env.REPLICATE_API_TOKEN
    } = opts

    this._apiBaseUrl = apiBaseUrl
    this._headers = {
      Authorization: `Token ${apiToken}`,
      'Content-Type': 'application/json'
    }
  }

  /**
   * Fetches a model.
   */
  async getModel(modelId: string): Promise<types.Model> {
    return this._get<types.Model>(`/models/${modelId}`)
  }

  /**
   * Fetches a list of model versions for a given model.
   */
  async getModelVersions(
    modelId: string,
    opts: {
      cursor?: string
    } = {}
  ): Promise<types.Paginated<types.ModelVersion>> {
    const { cursor } = opts

    return this._get<types.Paginated<types.ModelVersion>>(
      `/models/${modelId}/versions`,
      {
        searchParams: cursor ? { cursor } : undefined
      }
    )
  }

  /**
   * Fetches a specific version of a model.
   */
  async getModelVersion(
    modelId: string,
    modelVersion
  ): Promise<types.ModelVersion> {
    return this._get<types.ModelVersion>(
      `/models/${modelId}/versions/${modelVersion}`
    )
  }

  /**
   * Fetches a collection of models.
   */
  async getModelCollection(
    modelCollectionSlug: string
  ): Promise<types.ModelCollection> {
    return this._get<types.ModelCollection>(
      `/collections/${modelCollectionSlug}`
    )
  }

  /**
   * Fetches a prediction.
   */
  async getPrediction(id: string): Promise<types.Prediction> {
    return this._get<types.Prediction>(`/predictions/${id}`)
  }

  /**
   * Fetches a list of predictions.
   */
  async getPredictions(
    opts: {
      cursor?: string
    } = {}
  ): Promise<types.Paginated<types.Prediction>> {
    const { cursor } = opts

    return this._get<types.Paginated<types.Prediction>>(`/predictions`, {
      searchParams: cursor ? { cursor } : undefined
    })
  }

  /**
   * Creates a new prediction from a specific version of a model.
   */
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

  /**
   * Creates a new prediction from a specific version of a model and polls its
   * status until the prediction either resolves or times out.
   */
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
   * Polls the status of a prediction until it either resolves or times out.
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
      timeoutMs = 10 * 60 * 1000, // 10 minutes
      pollingIntervalMs = 2000,
      initialDelay = false
    } = opts

    let prediction: types.Prediction
    let isInitialRequest = true
    let isCanceled = false

    const resolvedPredictionP = new Promise<types.Prediction>(
      async (resolve, reject) => {
        try {
          do {
            if (isCanceled) {
              return reject()
            }

            if (initialDelay || !isInitialRequest) {
              // sleep longer if the model is still starting
              const sleepDurationMs =
                prediction?.status === 'starting'
                  ? Math.min(pollingIntervalMs * 10, 10000)
                  : pollingIntervalMs

              await delay(sleepDurationMs)
            }

            if (isCanceled) {
              return reject()
            }

            prediction = await this.getPrediction(id)
            if (utils.isPredictionResolved(prediction)) {
              return resolve(prediction)
            }

            isInitialRequest = false
          } while (true)
        } catch (err) {
          return reject(err)
        }
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

  /**
   * Cancels an existing prediction.
   */
  async cancelPrediction(id: string) {
    return this._post<types.Prediction>(`/predictions/${id}/cancel`)
  }

  /**
   * Uploads a blob of data using Replicate's AWS S3 wrapper.
   */
  async uploadData(
    data: GotOptions['body'],
    opts?: Partial<Omit<GotOptions, 'body' | 'method'>>
  ) {
    const upload = await this._post<types.Upload>('/upload/data.zip')

    // TODO: test
    // TODO: content-encoding: application/zip?
    await got(upload.upload_url, {
      method: 'PUT',
      body: data,
      headers: {
        ...this._headers,
        ...opts?.headers
      },
      ...opts
    })

    return upload.serving_url
  }

  /**
   * Fetches a training session.
   */
  async getTraining(id: string): Promise<types.Training> {
    return this._get<types.Training>(`/trainings/${id}`)
  }

  /**
   * Creates a new training session.
   */
  async createTraining({
    model,
    input,
    webhookCompleted
  }: {
    model: string
    input: any
    webhookCompleted?: string
  }) {
    return this._post<types.Training>('/trainings', {
      model,
      input,
      webhook_completed: webhookCompleted
    })
  }

  /**
   * Creates a new training session and polls its status until it either resolves
   * or times out.
   */
  async createAndResolveTraining({
    model,
    input,
    webhookCompleted,
    ...opts
  }: {
    model: string
    input: any
    webhookCompleted?: string
    timeoutMs?: number
    pollingIntervalMs?: number
  }) {
    const training = await this.createTraining({
      model,
      input,
      webhookCompleted
    })

    if (utils.isTrainingResolved(training)) {
      return training
    }

    return this.resolveTraining(training.id, {
      ...opts,
      initialDelay: true
    })
  }

  /**
   * Polls the status of a training session until it resolves or times out.
   */
  async resolveTraining(
    id: string,
    opts: {
      timeoutMs?: number
      pollingIntervalMs?: number
      initialDelay?: boolean
    } = {}
  ): Promise<types.Training> {
    const {
      timeoutMs = 8 * 60 * 60 * 1000, // 8 hours
      pollingIntervalMs = 10000,
      initialDelay = false
    } = opts

    let training: types.Training
    let isInitialRequest = true
    let isCanceled = false

    const resolvedTrainingP = new Promise<types.Training>(
      async (resolve, reject) => {
        try {
          do {
            if (isCanceled) {
              return reject()
            }

            if (initialDelay || !isInitialRequest) {
              await delay(pollingIntervalMs)
            }

            if (isCanceled) {
              return reject()
            }

            training = await this.getTraining(id)
            if (utils.isTrainingResolved(training)) {
              return resolve(training)
            }

            isInitialRequest = false
            console.warn(`training pending ${id}: ${training.status}`)
          } while (true)
        } catch (err) {
          return reject(err)
        }
      }
    )

    ;(resolvedTrainingP as any).cancel = () => {
      isCanceled = true
    }

    return pTimeout(resolvedTrainingP, {
      milliseconds: timeoutMs,
      message: `training error ${id}: timeout ${ms(timeoutMs)}`
    })
  }

  protected _get<T>(pathname: string, opts?: any) {
    const url = `${this._apiBaseUrl}${pathname}`
    console.warn('GET', url)
    return got(url, { ...opts, headers: this._headers }).json<T>()
  }

  protected _post<T>(pathname: string, body?: any) {
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
