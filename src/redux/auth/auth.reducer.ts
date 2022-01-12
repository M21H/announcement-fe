import { Nullable } from '../types'
import { IAuthAction } from './auth.types'

type IState = typeof initialState

const initialState = {
	id: null as Nullable<string>,
	username: null as Nullable<string>,
	createdAt: null as Nullable<string>,
	isAuth: true,
	error: '',
}

const authReducer = (state = initialState, action: IAuthAction): IState => {
	switch (action.type) {
		case 'GET_AUTH_USER_DATA_SUCCESS': {
			const { id, username, createdAt, isAuth } = action.payload
			return { ...state, id, username, createdAt, isAuth }
		}
		case 'GET_AUTH_USER_DATA_ERROR': {
			return {
				...state,
				error: action.payload,
			}
		}
		default:
			return state
	}
}

export default authReducer
