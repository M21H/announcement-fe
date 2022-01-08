import { Action, AuthActionType } from './auth.types'

export interface State {
	id: string | null
	username: string | null
	createdAt: string | null
	isAuth: boolean
}

const initialState = {
	id: null,
	username: null,
	createdAt: null,
	isAuth: false,
}

const authReducer = (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case AuthActionType.GET_AUTH_USER_DATA_SUCCESS: {
			const { id, username, createdAt, isAuth } = action.payload
			return { ...state, id, username, createdAt, isAuth }
		}
		default:
			return state
	}
}

export default authReducer
