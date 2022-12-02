import * as types from './types'

export function isPredictionResolved(prediction: types.Prediction): boolean {
  return (
    prediction.status === 'succeeded' ||
    prediction.status === 'failed' ||
    prediction.status === 'canceled'
  )
}
