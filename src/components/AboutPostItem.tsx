import { Button, Container } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/store'

const AboutPostItem = () => {
	const { id } = useParams<{ id: string }>()
	const history = useHistory()
	const { author, createdAt, desc, title } = useAppSelector(({ posts }) => posts.items.filter((item) => item._id === id))[0]

	return (
		<Container maxWidth='lg'>
			<div>
				<b>title:</b> {title}
			</div>
			<div>
				<b>description:</b> {desc}
			</div>
			<div>
				<b>author:</b> {author}
			</div>
			<div>
				<b>created:</b> {createdAt.slice(0, 10)}
			</div>
			<Button variant='contained' color='primary' onClick={history.goBack}>
				go back
			</Button>
			<h1>similar posts:</h1>
		</Container>
	)
}

export default AboutPostItem
