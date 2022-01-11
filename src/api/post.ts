import { client } from '.'

class APIPost {
	async fetchPosts(page = 1, size = 3) {
		const { data } = await client.get(`/posts?page=${page}&size=${size}`)
		return data
	}
}

export default new APIPost()