import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login, Signup, Homepage, Navbar, Dashboard} from "./components"
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'


const App = () => {


  return (
    <Router>
      <ProtectedRoute element={<Navbar />} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<AuthRoute element={<Login />} />} />
        <Route path="/signup" element={<AuthRoute element={<Signup />} />} />

        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

        <Route path="*" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  )
}

export default App
