import * as yup from 'yup'
import { LoginData, RegisterData } from '../redux/auth/auth.types'

export const loginSchema: yup.SchemaOf<LoginData> = yup.object({
	username: yup.string().required('Name is required'),
	password: yup.string().required('Password is required').min(5).max(20),
})

export const registerSchema: yup.SchemaOf<RegisterData> = yup.object({
	username: yup.string().required('Name is required'),
	password: yup.string().required('Password is required').min(5).max(20),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password')], 'Passwords not match'),
})
