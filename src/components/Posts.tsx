import { LinearProgress } from '@material-ui/core'
import { useCallback } from 'react'
import { deletePosts } from '../redux/posts/posts.actions'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { PostItem } from './PostItem'

const Posts: React.FC = () => {
	const dispatch = useAppDispatch()
	const { items, isLoading } = useAppSelector(({ posts }) => posts)

	const handleDelete = useCallback((id: number) => {
		//@ts-ignore
		dispatch(deletePosts(id))
	}, [])

	return isLoading ? (
		<LinearProgress />
	) : (
		<>
			{items.map((item) => (
				<PostItem key={item._id} {...item} onRemove={handleDelete} />
			))}
		</>
	)
}

export default Posts
