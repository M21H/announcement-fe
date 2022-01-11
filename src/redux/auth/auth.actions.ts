import TokenService from '../../service/storage.service'
import { IAuthThunk, LoginData, RegisterData } from './auth.types'
import APIAuth from '../../api/auth'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { APIStatusCode } from '../types/APITypes'

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

export const login =
	(loginData: LoginData): IAuthThunk =>
	async (dispatch) => {
		try {
			const { status, data } = await APIAuth.login(loginData)
			const decoded = jwtDecode<JwtPayloadType>(TokenService.getAuthToken() || '')
			if (status === APIStatusCode.Success) {
				dispatch(authAction.setAuthData(decoded.id, decoded.username, decoded.createdAt, true))
				dispatch(authAction.setAuthError(''))
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
			const { status } = await APIAuth.register(data)
			const decoded = jwtDecode<JwtPayloadType>(TokenService.getAuthToken() || '')
			if (status === APIStatusCode.Success) {
				dispatch(authAction.setAuthData(decoded.id, decoded.username, decoded.createdAt, true))
			}
		} catch (e) {
			console.log(e)
		}
	}

export const logout = (): IAuthThunk => async (dispatch) => {
	localStorage.clear()
	dispatch(authAction.setAuthData(null, null, null, false))
}
