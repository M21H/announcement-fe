import { Container, Grid, makeStyles, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Entry from '../components/Entry'

type IFormsType = {
	username: string
	password: string
}

const Login: React.FC = () => {
	const {
		register,
		resetField,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormsType>()

	const onSubmit = (data: IFormsType) => {
		console.log(data)
		resetField('password')
		resetField('username')
	}

	return (
		<Entry title='Login' onSubmit={handleSubmit(onSubmit)} linkTo='/register' linkText='go to registration' btnText='Login'>
			<TextField
				{...register('username', { required: true })}
				error={errors.username?.type === 'required'}
				type='text'
				variant='outlined'
				margin='normal'
				fullWidth
				placeholder='name'
				label='Name'
				autoFocus
			/>

			<TextField
				{...register('password', { required: true, min: 5, max: 20 })}
				error={errors.password?.type === 'required'}
				type='password'
				variant='outlined'
				margin='normal'
				fullWidth
				placeholder='password'
				label='Password'
			/>
		</Entry>
	)
}

export default Login
