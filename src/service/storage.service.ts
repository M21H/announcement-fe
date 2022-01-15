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

	setPaginationCurrentPostPage(page: number) {
		localStorage.setItem('currentPostPage', JSON.stringify(page))
	}
	getPaginationCurrentPostPage() {
		return localStorage.getItem('currentPostPage')
	}
}

export default new TokenService()
