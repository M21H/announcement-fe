import { LinearProgress } from '@material-ui/core'
import { useAppSelector } from '../redux/store'
import Pagination from './Pagination'
import PostItem from './PostItem'

const Posts: React.FC = () => {
	const { items, isLoading } = useAppSelector(({ posts }) => posts)

	return isLoading ? (
		<LinearProgress />
	) : (
		<>
			{items.map((item) => (
				<PostItem key={item._id} {...item} />
			))}
			<Pagination />
		</>
	)
}

export default Posts
