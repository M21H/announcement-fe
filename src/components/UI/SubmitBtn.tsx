import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	submit: {
		minWidth: 150,
		margin: theme.spacing(2, 0, 2),
	},
}))

type ISubmitBtn = {
	children: React.ReactNode
}

const SubmitBtn: React.FC<ISubmitBtn> = ({ children }) => {
	const classes = useStyles()
	return (
		<Button className={classes.submit} type='submit' variant='contained' color='primary'>
			{children}
		</Button>
	)
}

export default SubmitBtn
