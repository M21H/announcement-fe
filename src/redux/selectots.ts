import { AppState } from './store'

export const selectPosts = (state: AppState) => state.posts.items
