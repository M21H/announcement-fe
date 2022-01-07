import { yupResolver } from '@hookform/resolvers/yup'
import { makeStyles, Typography, Box } from '@material-ui/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Entry from '../components/Entry'
import * as yup from 'yup'
import FormField from '../components/FormField'
import SubmitBtn from '../components/UI/SubmitBtn'

type IFormsType = {
	username: string
	password: string
	confirm: string
}

const schema: yup.SchemaOf<IFormsType> = yup.object({
	username: yup.string().required('Name is required'),
	password: yup.string().min(5).max(20).required(),
	confirm: yup.string().min(5).max(20).required(),
})

const Register: React.FC = () => {
	const methods = useForm<IFormsType>({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<IFormsType> = (data: IFormsType) => {
		console.log(data)
	}

	return (
		<FormProvider {...methods}>
			<Entry onSubmit={methods.handleSubmit(onSubmit)}>
				<Typography component='h1' variant='h4' align='center'>
					Registration
				</Typography>

				<FormField name='username' label='User name' />
				<FormField name='password' label='Password' type='password' />
				<FormField name='confirm' label='Confirm password' type='password' />

				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Link to='/login'>go to login</Link>
					<SubmitBtn>Register</SubmitBtn>
				</Box>
			</Entry>
		</FormProvider>
	)
}

export default Register
