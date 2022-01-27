import { client } from '.'
import { IPostData } from '../components/PostItem'

class PostService {
	static async fetchPosts(page: number, size: number) {
		const { data } = await client.get(`/posts?page=${page}&size=${size}`)
		return data
	}

	static async findSimilar(id: string) {
		const { data } = await client.get(`/posts/find:${id}`)
		return data
	}

	static async updatePost(id: string, postData: IPostData) {
		const { data } = await client.put(`/posts/${id}`, postData)
		return data
	}

	static async createPost(author: string, title: string, desc: string) {
		const { data } = await client.post('/posts', { author, title, desc })
		return data
	}

	static async deletePost(id: string) {
		const { data } = await client.delete(`/posts/${id}`)
		return data
	}
}

export default PostService
