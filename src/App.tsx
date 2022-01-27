import { Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'

function App() {
	return (
		<Switch>
			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
			<Main />
		</Switch>
	)
}

export default App
