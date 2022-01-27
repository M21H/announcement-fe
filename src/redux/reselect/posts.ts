import { createSelector } from 'reselect'
import { AppState } from '../store'

export const filterPostsBy = (filter: 'title' | 'desc' | 'author' | 'createdAt') =>
	createSelector(
		(state: AppState) => state.posts.items,
		(state: AppState) => state.posts.search,
		(posts, search) => {
			return posts.filter((post) => post[filter].toLowerCase().includes(search.toLowerCase()))
		}
	)
