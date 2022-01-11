import React, { useEffect } from 'react'
import Navbar from '../components/AppBar'
import Posts from '../components/Posts'
import { getPosts } from '../redux/posts/posts.actions'
import { useAppDispatch, useAppSelector } from '../redux/store'

const Home: React.FC = () => {
	const { items, pageSize, currentPage, isLoading } = useAppSelector(({ posts }) => posts)

	const dispatch = useAppDispatch()
	useEffect(() => {
		//@ts-ignore
		dispatch(getPosts(currentPage, pageSize))
	}, [])

	return (
		<>
			<Navbar />
			<Posts />
		</>
	)
}

export default Home
