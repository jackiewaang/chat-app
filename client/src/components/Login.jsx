import { Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import supabase from "../supabase";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if(error){
      setErrorMsg(error.message);
    } else{
      setEmail('');
      setPassword('');
      setErrorMsg('');
      navigate('/dashboard');
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Log In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input className="w-full p-3 border rounded-lg border-gray-300" 
                  type="text" placeholder="Email" name="email" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input className="w-full p-3 border rounded-lg border-gray-300" 
                  type="password" placeholder="Password" name="password" 
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
                <Link to="/forgot" className="text-sm text-green-500 hover:text-green-700 text-right">Forgot Password?</Link>
                <button type="submit" className="w-full p-3 bg-green-500 hover:bg-green-600 rounded-lg">Log In</button>
                <p className="text-center text-sm">
                    Don&#39;t have an account?
                    <Link to="/signup" className="text-green-500 hover:text-green-700"> Sign Up</Link>
                </p>
            </form>
        </div>
    </div>
    
  )
}

export default Login
