class TokenService {
	getAuthToken() {
		return localStorage.getItem('authToken')
	}
	setAuthToken(token: string) {
		localStorage.setItem('authToken', token)
	}
	removeAuthToken() {
		localStorage.removeItem('authToken')
	}

	setPaginationCurrentPostPage(page: string) {
		localStorage.setItem('currentPostPage', page)
	}
	getPaginationCurrentPostPage() {
		return localStorage.getItem('currentPostPage')
	}
}

export default new TokenService()
