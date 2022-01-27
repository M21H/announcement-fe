import { client } from '.'
import { LoginData, RegisterData } from '../redux/auth/auth.types'
import { APIResponse } from '../redux/types/APITypes'

interface ResData {
	token: string
}

class AuthService {
	static async login(loginData: LoginData) {
		const { data } = await client.put<APIResponse<ResData>>('/auth/login', loginData)
		return data
	}

	static async register(registerData: RegisterData) {
		const { data } = await client.post<APIResponse<ResData>>('/auth/register', registerData)
		return data
	}
}

export default AuthService
