import { ThunkAction } from 'redux-thunk'
import { AppState, BaseThunkType, InferActionsTypes } from '../store'
import { authAction } from './auth.actions'

// export enum AuthActionType {
// 	GET_AUTH_USER_DATA_SUCCESS = 'GET_AUTH_USER_DATA_SUCCESS',
// }

// interface actionSuccess {
// 	type: AuthActionType.GET_AUTH_USER_DATA_SUCCESS
// 	payload: { id: string | null; username: string | null; createdAt: string | null; isAuth: boolean }
// }

// export type Action = actionSuccess

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

