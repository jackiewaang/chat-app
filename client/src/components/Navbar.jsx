import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <nav className="flex justify-between border shadow-md w-full fixed z-10 bottom-0 p-3">
      <Link to="/home"><IoHomeOutline className="w-12 h-12 cursor-pointer"/></Link>
      <Link to="/search"><IoIosSearch className="w-12 h-12"/></Link>
      <Link to="/newGroup"><MdOutlineGroupAdd className="w-12 h-12"/></Link>
      <Link to="/profile"><CgProfile className="w-12 h-12"/></Link>
    </nav>
  )
}

export default Navbar
