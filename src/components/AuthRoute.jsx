import { useSession } from './SessionContext'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const AuthRoute = ({ element }) => {
  
    const session = useSession();
    console.log(session);

    return session ? <Navigate to="/home" /> : element 
}

AuthRoute.propTypes = {
    element: PropTypes.element.isRequired
}



export default AuthRoute
