import { yupResolver } from '@hookform/resolvers/yup'
import { makeStyles, Typography, Box } from '@material-ui/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Entry from '../components/Entry'
import * as yup from 'yup'
import FormField from '../components/FormField'
import SubmitBtn from '../components/UI/SubmitBtn'
import { RegisterData } from '../redux/auth/auth.types'
import { register } from '../redux/auth/auth.actions'
import { useAppDispatch } from '../redux/store'

const schema: yup.SchemaOf<RegisterData> = yup.object({
	username: yup.string().required('Name is required'),
	password: yup.string().required('Password is required').min(5).max(20),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password')], 'Passwords not match'),
})

const Register: React.FC = () => {
	const dispatch = useAppDispatch()
	const methods = useForm<RegisterData>({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<RegisterData> = (data: RegisterData) => {
		//@ts-ignore
		dispatch(register(data))
	}

	return (
		<FormProvider {...methods}>
			<Entry onSubmit={methods.handleSubmit(onSubmit)}>
				<Typography component='h1' variant='h4' align='center'>
					Registration
				</Typography>

				<FormField name='username' label='User name' />
				<FormField name='password' label='Password' type='password' />
				<FormField name='confirmPassword' label='Confirm password' type='password' />

				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Link to='/login'>go to login</Link>
					<SubmitBtn>Register</SubmitBtn>
				</Box>
			</Entry>
		</FormProvider>
	)
}

export default Register
