import React, { useCallback, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { IPost } from '../redux/posts/posts.types'
import { Box, Container, TextField, Theme } from '@material-ui/core'
import BaseModal from './Modals/Modal'
import { deletePosts, updatePost } from '../redux/posts/posts.actions'
import { useAppDispatch } from '../redux/store'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		backgroundColor: '#15aca6',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '700px',
	},
	textFieldActions: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		'& button': {
			marginLeft: theme.spacing(2),
		},
	},
}))

export interface IPostData {
	author: string
	title: string
	desc: string
}

const PostItem: React.FC<IPost> = ({ _id, author, desc, title }) => {
	const dispatch = useAppDispatch()
	const classes = useStyles()
	const modalRef = useRef<typeof BaseModal>(null)
	const [fieldsValue, setFieldsValue] = useState<IPostData>({ author: '', title: '', desc: '' })

	const data: IPostData = {
		author: fieldsValue.author,
		title: fieldsValue.title,
		desc: fieldsValue.desc,
	}

	useEffect(() => {
		setFieldsValue({ author, title, desc })
	}, [author, desc, title])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldsValue({ ...fieldsValue, [e.target.name]: e.target.value })
	}

	const modalOpen = () => {
		//@ts-ignore
		modalRef.current?.onModalOpen()
	}
	const modalClose = () => {
		//@ts-ignore
		modalRef.current?.onModalClose()
	}

	const handleUpdate = useCallback(
		(id: number, data: IPostData) => {
			//@ts-ignore
			dispatch(updatePost(id, data))
			modalClose()
		},
		[dispatch]
	)

	const handleDelete = useCallback(
		(id: number) => {
			const confirm = window.confirm('are you sure?')
			if (confirm) {
				//@ts-ignore
				dispatch(deletePosts(id))
			}
		},
		[dispatch]
	)

	const handleClear = useCallback(() => {
		setFieldsValue({ author: '', title: '', desc: '' })
	}, [dispatch])

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
						<Button size='small' variant='contained'>
							About
						</Button>
						<Button size='small' variant='contained' onClick={modalOpen}>
							Edit
						</Button>
						<BaseModal ref={modalRef} title='Edit post'>
							<TextField
								value={fieldsValue.author}
								onChange={handleInputChange}
								name='author'
								label='author'
								placeholder={author}
								className={classes.textField}
								margin='normal'
								variant='outlined'
							/>
							<TextField
								value={fieldsValue.title}
								onChange={handleInputChange}
								name='title'
								label='title'
								placeholder={title}
								className={classes.textField}
								margin='normal'
								variant='outlined'
							/>
							<TextField
								value={fieldsValue.desc}
								onChange={handleInputChange}
								name='desc'
								label='desc'
								placeholder={desc}
								className={classes.textField}
								multiline
								rows={10}
								margin='normal'
								variant='outlined'
							/>
							<Box m={1} alignContent='center' className={classes.textFieldActions}>
								<Button variant='contained' color='primary' onClick={handleClear}>
									Clear fields
								</Button>
								<Button variant='contained' color='primary' onClick={() => handleUpdate(_id, data)}>
									Submit
								</Button>
								<Button variant='contained' color='secondary' onClick={() => handleDelete(_id)}>
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

export default PostItem
