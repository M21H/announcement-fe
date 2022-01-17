import { IAppAction } from './app.types'

type IState = typeof initialState

const initialState = {
	initialized: false,
}

export const AppReducer = (state = initialState, action: IAppAction): IState => {
	switch (action.type) {
		case 'INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			}
		case 'INITIALIZED_FAIL':
			return {
				...state,
				initialized: false,
			}
		default:
			return state
	}
}
