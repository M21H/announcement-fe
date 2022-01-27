import TokenService from '../../service/storage.service'
import { IAuthThunk, LoginData, RegisterData } from './auth.types'
import AuthService from '../../API/AuthService'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { APIStatusCode } from '../types/APITypes'
import { initializeApp } from '../app/app.action'

type JwtPayloadType = JwtPayload & { id: string; username: string; createdAt: string }

export const authAction = {
	setAuthData: (id: string | null, username: string | null, createdAt: string | null, isAuth: boolean) =>
		({
			type: 'GET_AUTH_USER_DATA_SUCCESS',
			payload: { id, username, createdAt, isAuth },
		} as const),
	setAuthError: (error: string) =>
		({
			type: 'GET_AUTH_USER_DATA_ERROR',
			payload: error,
		} as const),
}

export const getAuthUserData = (): IAuthThunk => async (dispatch) => {
	const decoded = jwtDecode<JwtPayloadType>(TokenService.getAuthToken() || '')
	if (decoded) {
		dispatch(authAction.setAuthData(decoded.id, decoded.username, decoded.createdAt, true))
	} else {
		dispatch(authAction.setAuthData(null, null, null, false))
	}
}

export const login =
	(loginData: LoginData): IAuthThunk =>
	async (dispatch) => {
		try {
			const { status, data } = await AuthService.login(loginData)
			if (status === APIStatusCode.Success) {
				dispatch(initializeApp())
			}
			if (status === APIStatusCode.Error) {
				//@ts-ignore
				dispatch(authAction.setAuthError(data?.message?.error))
			}
		} catch (e) {
			console.log(e)
		}
	}

export const register =
	(data: RegisterData): IAuthThunk =>
	async (dispatch) => {
		try {
			const { status } = await AuthService.register(data)
			if (status === APIStatusCode.Success) {
				dispatch(initializeApp())
			}
		} catch (e) {
			console.log(e)
		}
	}

export const logout = (): IAuthThunk => async (dispatch) => {
	localStorage.clear()
	dispatch(authAction.setAuthData(null, null, null, false))
}
