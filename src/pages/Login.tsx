import { Typography, Box } from '@material-ui/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Entry from '../components/Entry'
import FormField from '../components/FormField'
import SubmitBtn from '../components/UI/SubmitBtn'
import { LoginData } from '../redux/auth/auth.types'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { login } from '../redux/auth/auth.actions'
import { ILocation } from '../redux/types'

const schema: yup.SchemaOf<LoginData> = yup.object({
	username: yup.string().required('Name is required'),
	password: yup.string().required('Password is required').min(5).max(20),
})

const Login: React.FC = () => {
	const location = useLocation<ILocation>()
	const history = useHistory()
	const dispatch = useAppDispatch()
	const { isAuth, error } = useAppSelector(({ auth }) => auth)

	const methods = useForm<LoginData>({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
		const { from } = location.state || { from: { pathname: '/' } }
		// @ts-ignore
		dispatch(login(data))
		if (isAuth) {
			history.replace(from)
		}
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
					<SubmitBtn>Login</SubmitBtn>
				</Box>
			</Entry>
		</FormProvider>
	)
}

export default Login
