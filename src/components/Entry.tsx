import { Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
	submit: {
		minWidth: 150,
		margin: theme.spacing(2, 0, 2),
	},
}))

type EntryProps = {
	title: string
	onSubmit: () => void
	children: React.ReactNode
	linkTo: string
	linkText: string
	btnText: string
}

const Entry: React.FC<EntryProps> = ({ title, onSubmit, children, linkTo, linkText, btnText }) => {
	const classes = useStyles()
	return (
		<Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<form onSubmit={onSubmit} className={classes.form}>
						<Typography component='h1' variant='h4' align='center'>
							{title}
						</Typography>

						{children}

						<Box display='flex' alignItems='center' justifyContent='space-between'>
							<Link to={linkTo}>{linkText}</Link>
							<Button className={classes.submit} type='submit' variant='contained' color='primary'>
								{btnText}
							</Button>
						</Box>
					</form>
				</div>
			</Container>
		</Grid>
	)
}

export default Entry
