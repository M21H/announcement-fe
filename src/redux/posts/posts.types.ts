import { BaseThunkType, InferActionsTypes } from '../store'
import { postsAction } from './posts.actions'

export type IPostAction = InferActionsTypes<typeof postsAction>
export type IPostsThunk = BaseThunkType<IPostAction>

export interface IPost {
  _id: string
	author: string
	title: string
	desc: string
	createdAt: string
}