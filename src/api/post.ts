import { client } from '.'

class APIPost {
	async fetchPosts(page = 1, size = 3) {
		const { data } = await client.get(`/posts?page=${page}&size=${size}`)
		return data
	}

	async deletePost(id: number) {
		const { data } = await client.delete(`/posts/${id}`)
		return data
	}
}

export default new APIPost()
