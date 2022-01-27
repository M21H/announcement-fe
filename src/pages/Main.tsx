import { useEffect } from 'react'
import AboutPost from '../components/AboutPostItem'
import PrivateRoute from '../components/PrivateRoute'
import { useAppSelector } from '../redux/store'
import Navbar from '../components/Navbar'
import { useAppActions } from '../hooks/useAppActions'
import Posts from '../components/Posts'
import Center from '../components/Center'

const Main = () => {
	const { initializeApp, getPosts } = useAppActions()
	const { initialized, pageSize, currentPage } = useAppSelector(({ app, posts }) => ({
		initialized: app.initialized,
		pageSize: posts.pageSize,
		currentPage: posts.currentPage,
	}))

	useEffect(() => {
		initializeApp()
	}, [])

	useEffect(() => {
		getPosts(currentPage, pageSize)
	}, [])

	if (!initialized) {
		return <Center>Initialization...</Center>
	}

	return (
		<>
			<Navbar />
			<PrivateRoute path='/posts' exact>
				<Posts />
			</PrivateRoute>
			<PrivateRoute path='/posts/:id' exact>
				<AboutPost />
			</PrivateRoute>
		</>
	)
}

export default Main
