import dotenv from 'dotenv-safe'

import { ReplicateAPI } from './replicate-api'

dotenv.config()

/**
 * CLI for testing functionality.
 */
async function main() {
  const api = new ReplicateAPI({
    // TODO...
    apiBaseUrl: 'https://dreambooth-api-experimental.replicate.com/v1'
  })

  // const u = await api.uploadData()
  // return u

  const modelVersion =
    'd17ae39e9381328f048ec447d2ab4daf8b6c7a87b820a212e15b6bb0f9ebde90'
  const input = {
    prompt:
      'closeup portrait shot of a cyberpunk cjw in a scenic dystopian environment, intricate, elegant, highly detailed, centered, digital painting, artstation, concept art, smooth, sharp focus, illustration, artgerm, tomasz alen kopera, peter mohrbacher, donato giancola, joseph christian leyendecker, wlop, boris vallejo'
  }

  // const p = await api.getPrediction('ozuzckdy25cvpk5hykitk3cf74')
  const p = await api.createAndResolvePrediction({
    modelVersion,
    input
  })

  return p
}

main().then((out) => {
  console.log(JSON.stringify(out, null, 2))
})
