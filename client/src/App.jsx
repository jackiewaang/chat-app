import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login, Signup, Homepage, Navbar, Profile, Home, Chat} from "./components"
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'
import { useSession } from "./components/SessionContext"

const App = () => {

  const session = useSession();
  
  return (
    <Router>
      {/* {session ? <Navbar /> : null} */}
      {/* <ProtectedRoute element={<Navbar />} /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<AuthRoute element={<Login />} />} />
        <Route path="/signup" element={<AuthRoute element={<Signup />} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:channel" element={<Chat />} />
        <Route path="/profile/:username" element={<Profile />} />
        {/* <Route path="*" /> */}
      </Routes>
    </Router>
  )
}

export default App
