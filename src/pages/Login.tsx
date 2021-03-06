import { Typography, Box } from '@material-ui/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Entry from '../components/Entry'
import FormField from '../components/FormField'
import MySubmit from '../components/UI/button/MySubmit'
import { LoginData } from '../redux/auth/auth.types'
import { useAppSelector } from '../redux/store'
import { ILocation } from '../redux/types'
import { useAppActions } from '../hooks/useAppActions'
import { loginSchema } from '../validation'

const Login: React.FC = () => {
	const location = useLocation<ILocation>()
	const history = useHistory()
	const { login } = useAppActions()
	const { error } = useAppSelector(({ auth }) => auth)

	const methods = useForm<LoginData>({
		resolver: yupResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
		const { from } = location.state || { from: { pathname: '/posts' } }
		//@ts-ignore
		login(data.username, data.password).then(() => {
			history.replace(from)
		})
	}

	return (
		<FormProvider {...methods}>
			<Entry onSubmit={methods.handleSubmit(onSubmit)}>
				<Typography component='h1' variant='h4' align='center'>
					Login
				</Typography>

				<FormField name='username' label='User name' />
				<FormField name='password' label='Password' type='password' />

				{error && <span style={{ color: 'red' }}>{error}</span>}

				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Link to='/register'>go to registration</Link>
					<MySubmit>Login</MySubmit>
				</Box>
			</Entry>
		</FormProvider>
	)
}

export default Login
