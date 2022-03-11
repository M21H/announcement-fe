import { bindActionCreators } from 'redux'

import { appAction } from '../redux/app/app.action'
import { postsAction } from '../redux/posts/posts.actions'
import { authAction } from '../redux/auth/auth.actions'
import { useAppDispatch } from '../redux/store'

import { login, logout, register, getAuthUserData } from '../redux/auth/auth.actions'
import { initializeApp } from '../redux/app/app.action'
import { getPosts, updatePost, deletePost, createPost } from '../redux/posts/posts.actions'

const allActions = {
	...appAction,
	...postsAction,
	...authAction,
	login,
	logout,
	register,
	getAuthUserData,

	initializeApp,

	getPosts,
	updatePost,
	deletePost,
	createPost,
}

export const useAppActions = () => {
	const dispatch = useAppDispatch()
	return bindActionCreators(allActions, dispatch)
}
