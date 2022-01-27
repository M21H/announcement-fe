import { IPost, IPostsThunk } from './posts.types'
import PostService from '../../API/PostService'
import { IPostData } from '../../components/PostItem'

export const postsAction = {
	setLoading: (boolean: boolean) => ({ type: 'SET_LOADING', payload: boolean } as const),
	setPosts: (posts: Array<IPost>) => ({ type: 'SET_POSTS', payload: posts } as const),
	updatePost: (id: string, post: IPost) => ({ type: 'UPDATE_POST', payload: { id, post } } as const),
	createPost: (post: IPost) => ({ type: 'CREATE_POST', payload: post } as const),
	deletePost: (id: string) => ({ type: 'DELETE_POST', payload: id } as const),
	// setError: (payload) => ({ type: 'SET_ERROR', payload }),

	setCurrentPage: (pageNumber: number) => ({ type: 'SET_CURRENT_PAGE', payload: pageNumber } as const),
	setTotalPostsCount: (count: number) => ({ type: 'SET_TOTAL_PAGE_COUNT', payload: count } as const),

	// setSortedType: (sort: string) => ({ type: 'SET_SORT_TYPE', payload: sort } as const),

	setSearch: (value: string) => ({ type: 'SET_SEARCH_ITEM', payload: value } as const),
}

export const getPosts =
	(currentPage: number = 1, pageSize: number = 4): IPostsThunk =>
	async (dispatch) => {
		dispatch(postsAction.setLoading(true))
		try {
			const { data, total } = await PostService.fetchPosts(currentPage, pageSize)
			dispatch(postsAction.setTotalPostsCount(total))
			dispatch(postsAction.setPosts(data))
			dispatch(postsAction.setLoading(false))
		} catch (e) {
			console.log(e)
		}
	}

export const updatePost =
	(id: string, data: IPostData): IPostsThunk =>
	async (dispatch) => {
		try {
			const post = await PostService.updatePost(id, data)
			dispatch(postsAction.updatePost(id, post))
		} catch (e) {
			console.log(e)
		}
	}

export const createPost =
	(author: string, title: string, desc: string): IPostsThunk =>
	async (dispatch) => {
		try {
			await PostService.createPost(author, title, desc)
			dispatch(getPosts())
		} catch (e) {
			console.log(e)
		}
	}

export const deletePosts =
	(id: string): IPostsThunk =>
	async (dispatch) => {
		try {
			await PostService.deletePost(id)
			dispatch(getPosts())
		} catch (e) {
			console.log(e)
		}
	}
