import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAppDispatch, useAppSelector } from './redux/store'
import { useEffect } from 'react'
import { initializeApp } from './redux/app/app.action'

function App() {
	const dispatch = useAppDispatch()
	const { initialized } = useAppSelector(({ app }) => app)

	useEffect(() => {
		//@ts-ignore
		dispatch(initializeApp())
	}, [dispatch])

	if (!initialized) {
		return <div>Initialization application...</div>
	}

	return (
		<Switch>
			<PrivateRoute path='/' exact>
				<Home />
			</PrivateRoute>
			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
		</Switch>
	)
}

export default App
