import React, { memo, useRef, useState } from 'react'
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Container, AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu, TextField, Box, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { logout } from '../redux/auth/auth.actions'
import { Link } from 'react-router-dom'
import { createPost } from '../redux/posts/posts.actions'

import BaseModal from '../components/Modals/Modal'
import { IPostData } from './PostItem'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
			'& a': {
				color: 'inherit',
				textDecoration: 'none',
			},
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: alpha(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: alpha(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
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
	})
)

const Navbar: React.FC = () => {
	const classes = useStyles()
	const dispatch = useAppDispatch()
	const [fieldsValue, setFieldsValue] = useState<IPostData>({ author: '', title: '', desc: '' })
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const { username } = useAppSelector(({ auth }) => auth)
	const modalRef = useRef<typeof BaseModal>(null)

	const isMenuOpen = Boolean(anchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		//@ts-ignore
		dispatch(logout())
	}

	const modalOpen = () => {
		//@ts-ignore
		modalRef.current?.onModalOpen()
	}
	const modalClose = () => {
		//@ts-ignore
		modalRef.current?.onModalClose()
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldsValue({ ...fieldsValue, [e.target.name]: e.target.value })
	}

	const handleCreatePost = () => {
		//@ts-ignore
		dispatch(createPost(fieldsValue.author, fieldsValue.title, fieldsValue.desc))
		modalClose()
	}

	const menuId = 'primary-search-account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={modalOpen}>Create post</MenuItem>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	)

	return (
		<div className={classes.grow}>
			<AppBar position='sticky' style={{ backgroundColor: '#000' }}>
				<Container maxWidth='lg'>
					<Toolbar>
						<Typography className={classes.title} variant='h6' noWrap>
							<Link to='/'>Announcement</Link>
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						<div className={classes.grow} />
						<IconButton
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'>
							<Typography variant='h6' style={{ fontSize: '17px' }} noWrap>
								{username}
							</Typography>
						</IconButton>
					</Toolbar>
				</Container>
			</AppBar>
			{renderMenu}
			<BaseModal ref={modalRef} title='Create post'>
				<TextField
					value={fieldsValue.author}
					onChange={handleInputChange}
					name='author'
					label='author'
					className={classes.textField}
					margin='normal'
					variant='outlined'
				/>
				<TextField
					value={fieldsValue.title}
					onChange={handleInputChange}
					name='title'
					label='title'
					className={classes.textField}
					margin='normal'
					variant='outlined'
				/>
				<TextField
					value={fieldsValue.desc}
					onChange={handleInputChange}
					name='desc'
					label='desc'
					className={classes.textField}
					multiline
					rows={10}
					margin='normal'
					variant='outlined'
				/>
				<Box m={1} alignContent='center' className={classes.textFieldActions}>
					<Button variant='contained' color='primary' onClick={handleCreatePost}>
						Create post
					</Button>
				</Box>
			</BaseModal>
		</div>
	)
}

export default memo(Navbar)
