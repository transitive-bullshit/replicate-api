[replicate-api](readme.md) / Exports

# replicate-api

## Table of contents

### Classes

- [ReplicateAPI](classes/ReplicateAPI.md)
- [ReplicateModel](classes/ReplicateModel.md)

### Interfaces

- [Model](interfaces/Model.md)
- [ModelCollection](interfaces/ModelCollection.md)
- [ModelVersion](interfaces/ModelVersion.md)
- [Paginated](interfaces/Paginated.md)
- [Prediction](interfaces/Prediction.md)
- [PredictionInput](interfaces/PredictionInput.md)
- [PredictionMetrics](interfaces/PredictionMetrics.md)
- [PredictionUrls](interfaces/PredictionUrls.md)
- [Training](interfaces/Training.md)
- [TrainingInput](interfaces/TrainingInput.md)
- [Upload](interfaces/Upload.md)

### Type Aliases

- [PredictionStatus](modules.md#predictionstatus)

### Functions

- [isPredictionResolved](modules.md#ispredictionresolved)
- [isTrainingResolved](modules.md#istrainingresolved)

## Type Aliases

### PredictionStatus

Ƭ **PredictionStatus**: ``"starting"`` \| ``"processing"`` \| ``"succeeded"`` \| ``"failed"`` \| ``"canceled"``

#### Defined in

[types.ts:3](https://github.com/transitive-bullshit/replicate-api/blob/a32ace3/src/types.ts#L3)

## Functions

### isPredictionResolved

▸ **isPredictionResolved**(`prediction`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prediction` | [`Prediction`](interfaces/Prediction.md) |

#### Returns

`boolean`

#### Defined in

[utils.ts:3](https://github.com/transitive-bullshit/replicate-api/blob/a32ace3/src/utils.ts#L3)

___

### isTrainingResolved

▸ **isTrainingResolved**(`training`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `training` | [`Training`](interfaces/Training.md) |

#### Returns

`boolean`

#### Defined in

[utils.ts:11](https://github.com/transitive-bullshit/replicate-api/blob/a32ace3/src/utils.ts#L11)
