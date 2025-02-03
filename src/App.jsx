import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login, Signup, Homepage, Navbar, Profile, Home, Chat, Search} from "./components"
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<AuthRoute element={<Login />} />} />
        <Route path="/signup" element={<AuthRoute element={<Signup />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Navbar><Home /></Navbar>} />} />
        <Route path="/chat/:channel" element={<ProtectedRoute element={<Chat />} />} />
        <Route path="/profile/:username" element={<ProtectedRoute element={<Navbar><Profile /></Navbar>} />} />
        <Route path="/search" element={<ProtectedRoute element={<Navbar><Search /></Navbar>} />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  )
}

export default App
