import { useState, useEffect } from "react"
import supabase from "../supabase"
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const Home = () => {

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            const { data, error } = await supabase.from("channels").select("*");
            if(error){
                console.error(error);
            } else{
                setChannels(data);
            }
        }

        fetchChannels();
    }, [])

  return (
    <div className="h-screen p-5 flex flex-col">
        <nav className="flex justify-between items-center p-3 border-b">
            <h1 className="text-2xl font-bold">Available Channels</h1>
            <MdEdit className="w-6 h-6 cursor-pointer hover:scale-125 transition duration-300"/>
        </nav>
        <div className="flex flex-col gap-2 mt-4">
            {channels.length > 0 ? (
                channels.map((channel) => (
                    <Link key={channel.id} to={`/chat/${channel.name}`} className="p-5 bg-gray-200 rounded-lg shadow-sm text-xl hover:bg-gray-300 transition duration-300">
                        #{channel.name}
                    </Link>
                ))
            ) : (
                <p>No channels available</p>
            )}
        </div>
    </div>
  )
}

export default Home
