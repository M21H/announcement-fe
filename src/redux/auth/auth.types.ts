export enum AuthActionType {
	GET_AUTH_USER_DATA_SUCCESS = 'GET_AUTH_USER_DATA_SUCCESS',
}

interface actionSuccess {
	type: AuthActionType.GET_AUTH_USER_DATA_SUCCESS
	payload: { id: string | null; username: string | null; createdAt: string | null; isAuth: boolean }
}

export type Action = actionSuccess

export type LoginData = {
	username: string
	password: string
}
export type RegisterData = {
	username: string
	password: string
	confirmPassword: string
}