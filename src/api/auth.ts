import { client } from '.'
import { LoginData, RegisterData } from '../redux/auth/auth.types'
import { ResponseType } from './index'

type ResData = {
	token: string
}

class APIAuth {
	async login(loginData: LoginData) {
		const { data } = await client.put<ResponseType<ResData>>('/auth/login', loginData)
		return data
	}

	async register(registerData: RegisterData) {
		const { data } = await client.post<ResponseType<ResData>>('/auth/register', registerData)
		return data
	}
}

export default new APIAuth()
