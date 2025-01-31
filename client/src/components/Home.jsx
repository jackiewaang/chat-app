import { useState, useEffect } from "react"
import supabase from "../supabase"
import { Link } from "react-router-dom";

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
    <div className="h-screen p-4">
        <h1 className="text-xl font-bold mb-4">Available Channels</h1>
        <div className="flex flex-col gap-2">
            {channels.length > 0 ? (
                channels.map((channel) => (
                    <Link key={channel.id} to={`/chat/${channel.name}`} className="p-3 bg-gray-200 rounded-lg shadow-sm">
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
