import { Container, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
}))

type EntryProps = {
	children: React.ReactNode
	onSubmit: () => void
}

const Entry: React.FC<EntryProps> = ({ children, onSubmit }) => {
	const classes = useStyles()
	return (
		<Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '100vh' }}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<form onSubmit={onSubmit} className={classes.form}>
						{children}
					</form>
				</div>
			</Container>
		</Grid>
	)
}

export default Entry
