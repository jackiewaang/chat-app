import { useSession } from './SessionContext'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProtectedRoute = ({ element }) => {
  
    const session = useSession();

    return session ? element : <Navigate to="/login" />
}

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired
}



export default ProtectedRoute
