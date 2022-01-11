import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, compose, createStore, Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import authReducer from '../redux/auth/auth.reducer'
import PostsReducer from './posts/posts.reducer'

const rootReducer = combineReducers({ auth: authReducer, posts: PostsReducer })

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, A>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// @ts-ignore
window.store = store
