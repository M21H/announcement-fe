import { TextField } from '@material-ui/core'
import React, { HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'

type IFormField = {
	name: string
	label?: string
	id?: number
	type?: HTMLInputTypeAttribute
	variant?: 'filled' | 'standard' | 'outlined'
	margin?: 'normal' | 'dense' | 'none'
	placeholder?: string 
}

const FormField: React.FC<IFormField> = ({ label, name, type, variant = 'outlined', margin = 'normal', placeholder }) => {
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
			placeholder={placeholder}
			{...register(name)}
		/>
	)
}

export default FormField
