import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import supabase from "../supabase";

const Search = () => {

    const [search, setSearch] = useState("");
    const [channels, setChannels] = useState([]);

    const showChannels = async () => {
        
        if(!search.trim()) return;

        const { data, error } = await supabase
            .from("channels")
            .select("*")
            .ilike("name", `%${search}%`);
        
        if(error){
            console.error(error);
            return;
        } else{
            setChannels(data);
        }
    }

    const addChannel = () => {}

  return (
    <div className="h-screen p-5 flex flex-col">
        <nav className="border-b p-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Search channels</h1>
            <button onClick={addChannel()} className="flex items-center gap-3 cursor-pointer rounded-lg bg-green-400 p-3 hover:bg-green-500 transition duration-300">
                <IoIosAddCircleOutline className="w-8 h-8 cursor-pointer "/>
                <p className="text-lg">Add new channel</p>
            </button>
        </nav>
        <div className="flex items-center p-3 mt-4 rounded-lg bg-gray-100 gap-3">  
            <IoMdSearch onClick={showChannels} className="w-6 h-6 cursor-pointer"/>
            <input className="w-full outline-none" value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && showChannels()}></input>
        </div>
        <div className="mt-4 flex flex-col gap-2">
            {channels.map((channel) => (
                <Link to={`/chat/${channel.name}`} key={channel.id} className="p-5 bg-gray-200 rounded-lg shadow-sm text-xl hover:bg-gray-300 transition duration-300">#{channel.name}</Link>
            ))}
        </div>
    </div>
  )
}

export default Search
