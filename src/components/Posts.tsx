import { LinearProgress } from '@material-ui/core'
import { filterPostsBy } from '../redux/reselect/posts'
import { useAppSelector } from '../redux/store'
import Pagination from './Pagination'
import PostItem from './PostItem'
import Center from './Center'

const Posts: React.FC = () => {
	const { isLoading } = useAppSelector(({ posts }) => posts)
	const posts = useAppSelector(filterPostsBy('title'))

	return isLoading ? (
		<LinearProgress />
	) : (
		<>
			{posts.length ? posts.map((item) => <PostItem key={item._id} {...item} />) : <Center>No posts...</Center>}
			{!posts.length || <Pagination />}
		</>
	)
}

export default Posts
