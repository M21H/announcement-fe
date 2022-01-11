import { TextField } from '@material-ui/core'
import React, { HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAppSelector } from '../redux/store'
// import { string } from 'yup/lib/locale'

type IFormField = {
	label: string
	name: string
	id?: number
	type?: HTMLInputTypeAttribute
	variant?: 'filled' | 'standard' | 'outlined'
	margin?: 'normal' | 'dense' | 'none'
}

const FormField: React.FC<IFormField> = ({ label, name, type, variant = 'outlined', margin = 'normal' }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<TextField
			type={type}
			label={label}
			variant={variant}
			margin={margin}
			fullWidth
			error={!!errors[name]}
			helperText={errors[name]?.message ?? ''}
			{...register(name)}
		/>
	)
}

export default FormField
