import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import { useSession } from "./SessionContext";



const Navbar = ({ children }) => {

  const [username, setUsername] = useState('');
  const session = useSession();

  useEffect(() => {
    const getProfile = async() => {
      const { data: { username }, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", session.user.id)
      .single()

      if(error){
        console.error(error);
      } else{
        setUsername(username);
      }
    }

    getProfile();
  }, [session])


  return (
    <>
      {children}
    <nav className="flex justify-around border shadow-md w-full fixed z-10 bottom-0 p-3">
      <Link to="/home"><IoHomeOutline className="w-12 h-12 cursor-pointer"/></Link>
      <Link to="/search"><IoIosSearch className="w-12 h-12"/></Link>
      <Link to={`/profile/${username}`}><CgProfile className="w-12 h-12"/></Link>
    </nav>
    </>
  )
}

export default Navbar
