import { Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
	return (
		<div className='App'>
			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
		</div>
	)
}

export default App
