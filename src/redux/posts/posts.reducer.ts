import TokenService from '../../service/storage.service'
import { Nullable } from '../types'
import { IPostAction, IPost } from './posts.types'

type IState = typeof initialState

const initialState = {
	items: [] as Array<IPost>,
	search: '',
	isLoading: false,
	pageSize: 10,
	totalPagesCount: null as Nullable<number>,
	currentPage: Number(TokenService.getPaginationCurrentPostPage()) || 1,
}

const PostsReducer = (state = initialState, action: IPostAction): IState => {
	switch (action.type) {
		case 'SET_POSTS':
			return {
				...state,
				items: action.payload,
			}
		case 'SET_TOTAL_PAGE_COUNT':
			return {
				...state,
				totalPagesCount: action.payload,
			}
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload,
			}
		case 'UPDATE_POST':
			return {
				...state,
				items: state.items.map((item) => (item._id === action.payload.id ? action.payload.post : item)),
			}
		case 'SET_SEARCH_ITEM':
			return {
				...state,
				search: action.payload,
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.payload,
			}
		case 'DELETE_POST':
			return {
				...state,
				items: state.items.filter((item) => item._id !== action.payload),
			}
		default:
			return state
	}
}

export default PostsReducer
