//@ts-ignore
import { IPost, IPostsThunk } from './posts.types'
import APIPost from '../../api/post'

export const postsAction = {
	setLoading: (boolean: boolean) => ({ type: 'SET_LOADING', payload: boolean } as const),
	setPosts: (posts: Array<IPost>) => ({ type: 'SET_POSTS', payload: posts } as const),
	// updatePost: (id, post) => ({ type: 'UPDATE_POST', payload: { id, post } }),
	createPost: (post: IPost) => ({ type: 'CREATE_POST', payload: post } as const),
	deletePost: (id: number) => ({ type: 'DELETE_POST', payload: id } as const),
	// setError: (payload) => ({ type: 'SET_ERROR', payload }),

	setCurrentPage: (pageNumber: number) => ({ type: 'SET_CURRENT_PAGE', payload: pageNumber } as const),
	setTotalPostsCount: (count: number) => ({ type: 'SET_TOTAL_PAGE_COUNT', payload: count } as const),
}

export const getPosts =
	(currentPage: number, pageSize: number): IPostsThunk =>
	async (dispatch) => {
		dispatch(postsAction.setLoading(true))
		try {
			const { data, total } = await APIPost.fetchPosts(currentPage, pageSize)
			dispatch(postsAction.setTotalPostsCount(total))
			dispatch(postsAction.setPosts(data))

			dispatch(postsAction.setLoading(false))
		} catch (e) {
			console.log(e)
			// dispatch(postsAction.setError(e))
		}
	}

export const deletePosts =
	(id: number): IPostsThunk =>
	async (dispatch) => {
		try {
			const data = APIPost.deletePost(id)
			console.log(data)
			dispatch(postsAction.deletePost(id))
		} catch (e) {
			console.log(e)
		}
	}
