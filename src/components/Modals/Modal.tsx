import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import cn from 'classnames'
import { Box, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: 'absolute',
			width: 'min-content',
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		modal: {
			top: '50%',
			left: '50%',
			transform: `translate(-50%, -50%)`,
		},
	})
)

type IBaseModal = {
	title: string
	children: React.ReactNode
}

const BaseModal: React.FC<IBaseModal> = ({ title, children }) => {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const body = (
		<div className={cn(classes.paper, classes.modal)}>
			<h2 style={{ textAlign: 'center' }}>{title}</h2>

			{children}
		</div>
	)

	return (
		<>
			<Button size='small' onClick={handleOpen}>
				Edit
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
				{body}
			</Modal>
		</>
	)
}

export default BaseModal
