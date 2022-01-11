import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../redux/store'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
	const { isAuth } = useAppSelector(({ auth }) => auth)

	return <Route {...rest} render={({ location }) => (isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)} />
}

export default PrivateRoute
