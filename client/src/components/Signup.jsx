import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import supabase from "../supabase";

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // redirect after signup

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reloading

    // check matching passwords
    if(password !== confirm){
      setErrorMsg('Passwords do not match');
      return;
    }

    // check if username exists already
    const { data: usernameExists, error: usernameError } = await supabase.from('profiles').select('username').eq('username', username).single();

    // handle database error
    if (usernameError && usernameError.code !== 'PGRST116') {
      setErrorMsg('Error checking username:', usernameError.message, '. Please try again.');
      return;
    }

    // show message if user exists
    if(usernameExists){
      setErrorMsg('Username is already taken.');
      return;
    }

    // signup the new user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    
    if(signUpError){
      setPassword('');
      setConfirm('');
      setErrorMsg(signUpError.message);
      return;
    }

    // add username to database
    const userId = signUpData.user.id;
    const { error: profileError } = await supabase.from('profiles').insert({ id: userId, username: username });

    if(profileError){
      console.error('Error saving profile:', profileError.message);
      return;
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirm('');
    navigate('/dashboard');

  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="w-full p-3 border rounded-lg border-gray-300" 
            type="text" placeholder="Username" name="username" 
            value={username} onChange={(e) => setUsername(e.target.value)} 
          />
          <input className="w-full p-3 border rounded-lg border-gray-300" 
            type="text" placeholder="Email" name="email" 
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input className="w-full p-3 border rounded-lg border-gray-300" 
            type="password" placeholder="Password" name="password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <input className="w-full p-3 border rounded-lg border-gray-300" 
            type="password" placeholder="Confirm Password" name="confirm" 
            value={confirm} onChange={(e) => setConfirm(e.target.value)}
          />

          {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
          <button type="submit" className="w-full p-3 bg-green-500 hover:bg-green-600 rounded-lg">Sign Up</button>
          <p className="text-center text-sm">
              Already have an account?
              <Link to="/login" className="text-green-500 hover:text-green-700"> Log In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
