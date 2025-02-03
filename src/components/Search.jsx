import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import supabase from "../supabase";

const Search = () => {

    const dialogRef = useRef(null);
    const [search, setSearch] = useState("");
    const [channels, setChannels] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

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

    const addChannel = async () => {
        if(!channelName.trim()){
            setErrorMsg("Channel name is empty")
            return;
        };

        const { error } = await supabase
            .from("channels")
            .insert({ name: channelName })
        
        if(error){
            setErrorMsg("Channel already exists");
        } else{
            dialogRef.current.close();
            navigate(`/chat/${channelName}`);
            return true;
        }
    }

  return (
    <div className="h-screen p-5 flex flex-col">
        <nav className="border-b p-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Search channels</h1>
            <button onClick={() => dialogRef.current.showModal()} className="flex items-center gap-3 cursor-pointer rounded-lg bg-green-400 p-3 hover:bg-green-500 transition duration-300">
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
        <dialog ref={dialogRef} className="p-5 rounded-lg shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-semibold mb-4 text-center mx-5 mt-3">Add a new channel</h1>
            <input className="w-full p-3 border rounded-lg border-gray-300" type="text" placeholder="Channel Name"
            name="name" value={channelName} onChange={(e) => setChannelName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addChannel()}/>
            {errorMsg ? <p className="text-center text-red-500 text-lg mt-4">{errorMsg}</p> : null}
            <div className="flex mt-4 w-full justify-between items-center p-3">
                <button onClick={() => dialogRef.current.close()} className="px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
                <button onClick={addChannel} className="px-4 py-2 bg-green-500 rounded-md">Create</button>
            </div>
            
        </dialog>
    </div>
  )
}

export default Search
