## Constructors

### constructor

• **new ReplicateAPI**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.apiBaseUrl?` | `string` |
| `opts.apiToken?` | `string` |

#### Defined in

replicate-api.ts:13

## Properties

### \_apiBaseUrl

• `Protected` **\_apiBaseUrl**: `string`

#### Defined in

replicate-api.ts:10

___

### \_headers

• `Protected` **\_headers**: `Record`<`string`, `string`\>

#### Defined in

replicate-api.ts:11

## Methods

### \_get

▸ `Protected` **_get**<`T`\>(`pathname`, `opts?`): `CancelableRequest`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |
| `opts?` | `any` |

#### Returns

`CancelableRequest`<`T`\>

#### Defined in

replicate-api.ts:369

___

### \_post

▸ `Protected` **_post**<`T`\>(`pathname`, `body?`): `CancelableRequest`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |
| `body?` | `any` |

#### Returns

`CancelableRequest`<`T`\>

#### Defined in

replicate-api.ts:375

___

### cancelPrediction

▸ **cancelPrediction**(`id`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

Cancels an existing prediction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:222

___

### createAndResolvePrediction

▸ **createAndResolvePrediction**(`__namedParameters`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

Creates a new prediction from a specific version of a model and polls its
status until the prediction either resolves or times out.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.input` | `any` |
| `__namedParameters.modelVersion` | `string` |
| `__namedParameters.pollingIntervalMs?` | `number` |
| `__namedParameters.timeoutMs?` | `number` |
| `__namedParameters.webhook?` | `string` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:125

___

### createAndResolveTraining

▸ **createAndResolveTraining**(`__namedParameters`): `Promise`<[`Training`](../interfaces/Training.md)\>

Creates a new training session and polls its status until it either resolves
or times out.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.input` | `any` |
| `__namedParameters.model` | `string` |
| `__namedParameters.pollingIntervalMs?` | `number` |
| `__namedParameters.timeoutMs?` | `number` |
| `__namedParameters.webhookCompleted?` | `string` |

#### Returns

`Promise`<[`Training`](../interfaces/Training.md)\>

#### Defined in

replicate-api.ts:280

___

### createPrediction

▸ **createPrediction**(`__namedParameters`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

Creates a new prediction from a specific version of a model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.input` | `any` |
| `__namedParameters.modelVersion` | `string` |
| `__namedParameters.webhook?` | `string` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:105

___

### createTraining

▸ **createTraining**(`__namedParameters`): `Promise`<[`Training`](../interfaces/Training.md)\>

Creates a new training session.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.input` | `any` |
| `__namedParameters.model` | `string` |
| `__namedParameters.webhookCompleted?` | `string` |

#### Returns

`Promise`<[`Training`](../interfaces/Training.md)\>

#### Defined in

replicate-api.ts:260

___

### getModel

▸ **getModel**(`modelId`): `Promise`<[`Model`](../interfaces/Model.md)\>

Fetches a model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelId` | `string` |

#### Returns

`Promise`<[`Model`](../interfaces/Model.md)\>

#### Defined in

replicate-api.ts:34

___

### getModelCollection

▸ **getModelCollection**(`modelCollectionSlug`): `Promise`<[`ModelCollection`](../interfaces/ModelCollection.md)\>

Fetches a collection of models.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelCollectionSlug` | `string` |

#### Returns

`Promise`<[`ModelCollection`](../interfaces/ModelCollection.md)\>

#### Defined in

replicate-api.ts:72

___

### getModelVersion

▸ **getModelVersion**(`modelId`, `modelVersion`): `Promise`<[`ModelVersion`](../interfaces/ModelVersion.md)\>

Fetches a specific version of a model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelId` | `string` |
| `modelVersion` | `any` |

#### Returns

`Promise`<[`ModelVersion`](../interfaces/ModelVersion.md)\>

#### Defined in

replicate-api.ts:60

___

### getModelVersions

▸ **getModelVersions**(`modelId`, `opts?`): `Promise`<[`Paginated`](../interfaces/Paginated.md)<[`ModelVersion`](../interfaces/ModelVersion.md)\>\>

Fetches a list of model versions for a given model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelId` | `string` |
| `opts` | `Object` |
| `opts.cursor?` | `string` |

#### Returns

`Promise`<[`Paginated`](../interfaces/Paginated.md)<[`ModelVersion`](../interfaces/ModelVersion.md)\>\>

#### Defined in

replicate-api.ts:41

___

### getPrediction

▸ **getPrediction**(`id`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

Fetches a prediction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:83

___

### getPredictions

▸ **getPredictions**(`opts?`): `Promise`<[`Paginated`](../interfaces/Paginated.md)<[`Prediction`](../interfaces/Prediction.md)\>\>

Fetches a list of predictions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.cursor?` | `string` |

#### Returns

`Promise`<[`Paginated`](../interfaces/Paginated.md)<[`Prediction`](../interfaces/Prediction.md)\>\>

#### Defined in

replicate-api.ts:90

___

### getTraining

▸ **getTraining**(`id`): `Promise`<[`Training`](../interfaces/Training.md)\>

Fetches a training session.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Training`](../interfaces/Training.md)\>

#### Defined in

replicate-api.ts:253

___

### resolvePrediction

▸ **resolvePrediction**(`id`, `opts?`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

Polls the status of a prediction until it either resolves or times out.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `opts` | `Object` |
| `opts.initialDelay?` | `boolean` |
| `opts.pollingIntervalMs?` | `number` |
| `opts.timeoutMs?` | `number` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:156

___

### resolveTraining

▸ **resolveTraining**(`id`, `opts?`): `Promise`<[`Training`](../interfaces/Training.md)\>

Polls the status of a training session until it resolves or times out.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `opts` | `Object` |
| `opts.initialDelay?` | `boolean` |
| `opts.pollingIntervalMs?` | `number` |
| `opts.timeoutMs?` | `number` |

#### Returns

`Promise`<[`Training`](../interfaces/Training.md)\>

#### Defined in

replicate-api.ts:311

___

### uploadData

▸ **uploadData**(`data`, `opts?`): `Promise`<`string`\>

Uploads a blob of data using Replicate's AWS S3 wrapper.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` \| `Readable` \| `Generator`<`unknown`, `any`, `unknown`\> \| `AsyncGenerator`<`unknown`, `any`, `unknown`\> \| `FormDataLike` |
| `opts?` | `Partial`<`Omit`<`default`, ``"body"`` \| ``"method"``\>\> |

#### Returns

`Promise`<`string`\>

#### Defined in

replicate-api.ts:229
