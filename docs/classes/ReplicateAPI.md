## Constructors

### constructor

• **new ReplicateAPI**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.apiBaseUrl?` | `string` |
| `opts.apiToken?` | `string` |
| `opts.pollingIntervalMs?` | `number` |
| `opts.timeoutMs?` | `number` |

#### Defined in

replicate-api.ts:15

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

___

### \_pollingIntervalMs

• `Protected` **\_pollingIntervalMs**: `number`

#### Defined in

replicate-api.ts:12

___

### \_timeoutMs

• `Protected` **\_timeoutMs**: `number`

#### Defined in

replicate-api.ts:13

## Methods

### \_get

▸ **_get**<`T`\>(`pathname`): `CancelableRequest`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |

#### Returns

`CancelableRequest`<`T`\>

#### Defined in

replicate-api.ts:158

___

### \_post

▸ **_post**<`T`\>(`pathname`, `body?`): `CancelableRequest`<`T`\>

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

replicate-api.ts:164

___

### cancelPrediction

▸ **cancelPrediction**(`id`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:154

___

### createAndResolvePrediction

▸ **createAndResolvePrediction**(`__namedParameters`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

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

replicate-api.ts:64

___

### createPrediction

▸ **createPrediction**(`__namedParameters`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

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

replicate-api.ts:48

___

### getModel

▸ **getModel**(`modelId`): `Promise`<[`Model`](../interfaces/Model.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelId` | `string` |

#### Returns

`Promise`<[`Model`](../interfaces/Model.md)\>

#### Defined in

replicate-api.ts:40

___

### getPrediction

▸ **getPrediction**(`id`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Prediction`](../interfaces/Prediction.md)\>

#### Defined in

replicate-api.ts:44

___

### resolvePrediction

▸ **resolvePrediction**(`id`, `opts?`): `Promise`<[`Prediction`](../interfaces/Prediction.md)\>

Polls the status of a prediction until it resolves.

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

replicate-api.ts:95
