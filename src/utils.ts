import * as types from './types'

export function isPredictionResolved(prediction: types.Prediction): boolean {
  return (
    prediction.status === 'succeeded' ||
    prediction.status === 'failed' ||
    prediction.status === 'canceled'
  )
}

export function isTrainingResolved(training: types.Training): boolean {
  return (
    training.status === 'succeeded' ||
    training.status === 'failed' ||
    training.status === 'canceled'
  )
}
