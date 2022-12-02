import type { OpenAPIV3_1 } from 'openapi-types'

export type PredictionStatus =
  | 'starting'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'canceled'

export interface Prediction {
  completed_at?: string | null
  created_at: string
  error: any
  id: string
  input: PredictionInput
  logs: string | null
  metrics: PredictionMetrics
  output: string[] | null
  started_at: string | null
  status: PredictionStatus
  urls: PredictionUrls
  version: string
  webhook_completed: null
}

export interface PredictionInput {
  prompt: string
}

export interface PredictionMetrics {
  predict_time: number
}

export interface PredictionUrls {
  get: string
  cancel: string
}

export interface Model {
  url: string
  owner: string
  name: string
  description: string
  visibility: string
  github_url: string | null
  paper_url: string | null
  license_url: string | null
  latest_version: ModelVersion
}

export interface ModelVersion {
  id: string
  created_at: Date
  cog_version: string
  openapi_schema: OpenAPIV3_1.Document
}

export interface Upload {
  upload_url: string
  serving_url: string
}

export interface Training {
  id: string
  input: TrainingInput
  model: string
  status: string
  webhook_completed: string
}

export interface TrainingInput {
  instance_prompt: string
  class_prompt: string
  instance_data: string
  max_train_steps: number
}
