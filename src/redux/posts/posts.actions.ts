import { IPost, IPostsThunk } from './posts.types'
import PostService from '../../API/PostService'
import { IPostData } from '../../components/PostItem'

const postsAction = {
	setLoading: (boolean: boolean) => ({ type: 'SET_LOADING', payload: boolean } as const),
	setPosts: (posts: Array<IPost>) => ({ type: 'SET_POSTS', payload: posts } as const),
	updatePost: (id: string, post: IPost) => ({ type: 'UPDATE_POST', payload: { id, post } } as const),
	createPost: (post: IPost) => ({ type: 'CREATE_POST', payload: post } as const),
	deletePost: (id: string) => ({ type: 'DELETE_POST', payload: id } as const),
	setError: (payload: string) => ({ type: 'SET_ERROR', payload } as const),
	setCurrentPage: (pageNumber: number) => ({ type: 'SET_CURRENT_PAGE', payload: pageNumber } as const),
	setTotalPostsCount: (count: number) => ({ type: 'SET_TOTAL_PAGE_COUNT', payload: count } as const),
	setSearch: (value: string) => ({ type: 'SET_SEARCH_ITEM', payload: value } as const),
}

const getPosts =
	(currentPage: number = 1, pageSize: number = 10): IPostsThunk =>
	async (dispatch) => {
		try {
			dispatch(postsAction.setLoading(true))
			const { data, total } = await PostService.fetchPosts(currentPage, pageSize)
			dispatch(postsAction.setTotalPostsCount(total))
			dispatch(postsAction.setPosts(data))
		} catch (e) {
			console.log(e)
		} finally {
			dispatch(postsAction.setLoading(false))
		}
	}

const updatePost =
	(id: string, data: IPostData): IPostsThunk =>
	async (dispatch) => {
		try {
			const post = await PostService.updatePost(id, data)
			dispatch(postsAction.updatePost(id, post))
		} catch (e) {
			console.log(e)
		}
	}

const createPost =
	(author: string, title: string, desc: string): IPostsThunk =>
	async (dispatch) => {
		try {
			await PostService.createPost(author, title, desc)
			dispatch(getPosts())
		} catch (e) {
			console.log(e)
		}
	}

const deletePost =
	(id: string): IPostsThunk =>
	async (dispatch) => {
		try {
			await PostService.deletePost(id)
			dispatch(getPosts())
		} catch (e) {
			console.log(e)
		}
	}

export { postsAction, getPosts, updatePost, createPost, deletePost }
