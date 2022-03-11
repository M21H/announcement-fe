import { BaseThunkType, InferActionsTypes } from '../store'
import { authAction } from './auth.actions'

export interface LoginData {
	username: string
	password: string
}
export interface RegisterData {
	username: string
	password: string
	confirmPassword: string
}

export type IAuthAction = InferActionsTypes<typeof authAction>
export type IAuthThunk = BaseThunkType<IAuthAction>

