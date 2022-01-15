//@ts-nocheck
import React, { forwardRef, useImperativeHandle } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import cn from 'classnames'

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

interface IBaseModal {
	title: string
	children: React.ReactNode
}

const BaseModal: React.FC<IBaseModal> = ({ title, children }, ref) => {
	const classes = useStyles()
	const [display, setDisplay] = React.useState(false)

	const handleOpen = () => {
		setDisplay(true)
	}

	const handleClose = () => {
		setDisplay(false)
	}

	useImperativeHandle(ref, () => ({
		onModalClose: () => handleClose(),
		onModalOpen: () => handleOpen(),
	}))

	const body = (
		<div className={cn(classes.paper, classes.modal)}>
			<h2 style={{ textAlign: 'center' }}>{title}</h2>
			{children}
		</div>
	)

	return display ? (
		<Modal open={display} onClose={handleClose} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
			{body}
		</Modal>
	) : null
}

export default forwardRef(BaseModal)
