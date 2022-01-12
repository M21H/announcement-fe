import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { IPost } from '../redux/posts/posts.types'
import { Box, Container, createStyles, TextField, Theme } from '@material-ui/core'
import BaseModal from './Modals/Modal'
// import FormField from './FormField'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: '#15aca6',
		},
		cardBtn: {
			color: '#000',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: '700px',
		},
		textFieldActions: {
			display: 'flex',
			justifyContent: 'flex-end',
			'& button': {
				marginLeft: theme.spacing(2),
			},
		},
	})
)

type IPostItem = {
	onRemove: (id: number) => void
}

export const PostItem: React.FC<IPost & IPostItem> = ({ _id, author, desc, title, createdAt, onRemove }) => {
	const classes = useStyles()

	return (
		<Box m={3}>
			<Container maxWidth='lg'>
				<Card className={classes.root}>
					<CardContent>
						<Typography align='center' gutterBottom variant='h5' component='h2'>
							{title}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{desc}
						</Typography>
					</CardContent>

					<CardActions>
						{/* <CardActionArea> */}
						<Button size='small' className={classes.cardBtn}>
							About
						</Button>
						<BaseModal title='Edit post'>
							<TextField
								label='author'
								id='outlined-margin-normal'
								placeholder={author}
								value={author}
								className={classes.textField}
								// helperText='title'
								margin='normal'
								variant='outlined'
							/>
							<TextField
								label='title'
								id='outlined-margin-normal'
								placeholder={title}
								value={title}
								className={classes.textField}
								// helperText='title'
								margin='normal'
								variant='outlined'
							/>
							<TextField
								label='desc'
								id='outlined-margin-normal'
								placeholder={desc}
								value={desc}
								className={classes.textField}
								multiline
								rows={10}
								// helperText='title'
								margin='normal'
								variant='outlined'
							/>
							<Box m={1} className={classes.textFieldActions}>
								<Button variant='contained' color='primary'>
									Clear fields
								</Button>
								<Button variant='contained' color='primary'>
									Submit
								</Button>
								<Button variant='contained' color='secondary' onClick={() => onRemove(_id)}>
									Delete
								</Button>
							</Box>
						</BaseModal>
					</CardActions>
				</Card>
			</Container>
		</Box>
	)
}
