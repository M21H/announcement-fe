import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
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
