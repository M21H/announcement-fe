import { client } from '.'
import { IPostData } from '../components/PostItem'

class APIPost {
	async fetchPosts(page: number, size: number) {
		const { data } = await client.get(`/posts?page=${page}&size=${size}`)
		return data
	}

	async updatePost(id: number, postData: IPostData) {
		const { data } = await client.put(`/posts/${id}`, postData)
		return data
	}

	async createPost(author: string, title: string, desc: string) {
		const { data } = await client.post('/posts', { author, title, desc })
		return data
	}

	async deletePost(id: number) {
		const { data } = await client.delete(`/posts/${id}`)
		return data
	}
}

export default new APIPost()
