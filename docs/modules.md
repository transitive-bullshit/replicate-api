## Classes

- [ReplicateAPI](classes/ReplicateAPI.md)
- [ReplicateModel](classes/ReplicateModel.md)

## Interfaces

- [Model](interfaces/Model.md)
- [ModelVersion](interfaces/ModelVersion.md)
- [Prediction](interfaces/Prediction.md)
- [PredictionInput](interfaces/PredictionInput.md)
- [PredictionMetrics](interfaces/PredictionMetrics.md)
- [PredictionUrls](interfaces/PredictionUrls.md)

## Type Aliases

### PredictionStatus

Ƭ **PredictionStatus**: ``"starting"`` \| ``"processing"`` \| ``"succeeded"`` \| ``"failed"`` \| ``"canceled"``

#### Defined in

types.ts:3

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

utils.ts:3
