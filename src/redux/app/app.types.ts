import { BaseThunkType, InferActionsTypes } from '../store'
import { appAction } from './app.action'

export type IAppAction = InferActionsTypes<typeof appAction>
export type IAppThunk = BaseThunkType<IAppAction>
