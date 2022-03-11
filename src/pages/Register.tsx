import { yupResolver } from '@hookform/resolvers/yup'
import { Typography, Box } from '@material-ui/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Entry from '../components/Entry'
import FormField from '../components/FormField'
import MySubmit from '../components/UI/button/MySubmit'
import { RegisterData } from '../redux/auth/auth.types'
import { ILocation } from '../redux/types'
import { useAppActions } from '../hooks/useAppActions'
import { registerSchema } from '../validation'

const Register: React.FC = () => {
	const location = useLocation<ILocation>()
	const history = useHistory()
	const { register } = useAppActions()

	const methods = useForm<RegisterData>({
		resolver: yupResolver(registerSchema),
	})

	const onSubmit: SubmitHandler<RegisterData> = (data: RegisterData) => {
		const { from } = location.state || { from: { pathname: '/posts' } }
		//@ts-ignore
		register(data.username, data.password, data.confirmPassword).then(() => {
			history.replace(from)
		})
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
					<MySubmit>Register</MySubmit>
				</Box>
			</Entry>
		</FormProvider>
	)
}

export default Register
