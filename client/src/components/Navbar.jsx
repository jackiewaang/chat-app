import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { useEffect, useState } from "react";



const Navbar = () => {

  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  

  useEffect(() => {
    const getProfile = async () => {
          const { data: { user }} = await supabase.auth.getUser();

          if(user){
            const { data, error } = await supabase.from('profiles').select('username').eq('id', user.id).single();
            
            if(error){
              console.error('Error fetching profile:', error);
            } else{
              setUsername(data?.username || '');
            }
          }
    }

    // const signout = async () => {
    //   await supabase.auth.signOut();
    //   navigate('/')
    // }

    // signout()

    // getProfile();
  }, []);

  return (
    <nav className="flex justify-between border shadow-md w-full fixed z-10 bottom-0 p-3">
      <Link to="/home"><IoHomeOutline className="w-12 h-12 cursor-pointer"/></Link>
      <Link to="/search"><IoIosSearch className="w-12 h-12"/></Link>
      <Link to="/newGroup"><MdOutlineGroupAdd className="w-12 h-12"/></Link>
      <Link to={`/${username}`}><CgProfile className="w-12 h-12"/></Link>
      <button type='button' onClick={() => {signout}}>Sign out</button>
    </nav>
  )
}

export default Navbar
