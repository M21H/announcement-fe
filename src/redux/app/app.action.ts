import { authAction, getAuthUserData } from '../auth/auth.actions'
import { IAppThunk } from './app.types'

export const appAction = {
	initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const),
	initializedFail: () => ({ type: 'INITIALIZED_FAIL' } as const),
}

export const initializeApp =
	(): IAppThunk =>
	(dispatch): any => {
		dispatch(getAuthUserData())
		dispatch(appAction.initializedSuccess())
		//@ts-ignore
		dispatch(authAction.setAuthError(''))
	}
