import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link} from "react-router-dom";
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
      <Link to="/home" className="hover:scale-125 transition duration-300"><IoHomeOutline className="w-12 h-12"/></Link>
      <Link to="/search" className="hover:scale-125 transition duration-300"><IoIosSearch className="w-12 h-12"/></Link>
      <Link to={`/profile/${username}`} className="hover:scale-125 transition duration-300"><CgProfile className="w-12 h-12"/></Link>
    </nav>
    </>
  )
}

export default Navbar
