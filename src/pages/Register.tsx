import { Container, Grid, makeStyles, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Entry from '../components/Entry'

type IFormsType = {
	username: string
	password: string
	confirm: string
}

const Register: React.FC = () => {
	const {
		register,
		resetField,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IFormsType>()


  //TODO: fix password/confirm validation
	const onSubmit = (data: IFormsType) => {
		if (data.password !== data.confirm) {
			setError('password', {
				type: 'manual',
				message: 'Passwords not match',
			})
			resetField('password')
			resetField('confirm')
		} else {
			console.log(data)

			resetField('password')
			resetField('username')
			resetField('confirm')
		}
	}

	return (
		<Entry title='Registration' onSubmit={handleSubmit(onSubmit)} linkTo='/login' linkText='go to login' btnText='Register'>
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

			<TextField
				{...register('confirm', { required: true, min: 5, max: 20 })}
				error={errors.confirm?.type === 'required'}
				type='password'
				variant='outlined'
				margin='normal'
				fullWidth
				placeholder='confirm'
				label='Confirm'
			/>
		</Entry>
	)
}

export default Register
