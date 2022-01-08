import TokenService from '../../service/storage.service'
import { AppDispatch } from '../store'
import { AuthActionType, LoginData, RegisterData } from './auth.types'
import APIAuth from '../../api/auth'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { APIStatusCode } from '../../api'
import { Action } from './auth.types'
import { Dispatch } from 'react'

type JwtPayloadType = JwtPayload & { id: string; username: string; createdAt: string }

export const authAction = {
	setAuthData: (id: string | null, username: string | null, createdAt: string | null, isAuth: boolean) => ({
		type: AuthActionType.GET_AUTH_USER_DATA_SUCCESS,
		payload: { id, username, createdAt, isAuth },
	}),
}


export const login = (data: LoginData) => async (dispatch: Dispatch<Action>) => {
	try {
		const { status } = await APIAuth.login(data)
		const decoded = jwtDecode<JwtPayloadType>(TokenService.getAuthToken() || '')
		if (status === APIStatusCode.Success) {
			dispatch(authAction.setAuthData(decoded.id, decoded.username, decoded.createdAt, true))
		}
	} catch (e) {
		console.log(e)
	}
}

export const register = (data: RegisterData) => async (dispatch: Dispatch<Action>) => {

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

export const logout = () => (dispatch: AppDispatch) => {
	localStorage.clear()
	dispatch(authAction.setAuthData(null, null, null, false))
}