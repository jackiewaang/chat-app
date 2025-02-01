import { Link, useParams } from "react-router-dom"
import { IoIosCloseCircleOutline, IoIosSend } from "react-icons/io";
import { PiGearSixBold } from "react-icons/pi";
import { useState, useRef, useEffect } from "react";
import supabase from "../supabase";
import { useSession } from "./SessionContext";

const Chat = () => {

    const { channel } = useParams();
    const session = useSession();
    const [channelId, setChannelId] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messageEndRef = useRef(null);

    useEffect(() => {
        const getMessages = async () => {

            const { data: channelData, error: channelError } = await supabase
                .from("channels")
                .select("id")
                .eq("name", channel)
                .single();

            if(channelError){
                console.error(channelError);
                return;
            }
            
            const id = channelData?.id;
            setChannelId(id);

            const { data, error } = await supabase.rpc("get_channel_messages", {
                channel_name: channel
            });

            if(error){
                console.error(error);
            } else{
                setMessages(data);
            }

            const subscription = supabase
                        .channel("messages")
                        .on(
                            "postgres_changes",
                            { event: "INSERT", schema: "public", table: "messages", filter:`channel_id=eq.${channelId}`},
                            async (payload) => {
                                
                                const { data: profileData, error: profileError } = await supabase
                                    .from("profiles")
                                    .select("username")
                                    .eq("id", payload.new.user_id)
                                    .single();

                                if(profileError){
                                    console.error(profileError);
                                } else{
                                    setMessages((prev) => [...prev,
                                        {
                                            ...payload.new,
                                            created_at: new Date(payload.new.created_at).toISOString().slice(0, 16).replace("T", " "),
                                            username: profileData.username
                                        }
                                    ])
                                }
                            }
                        )
                        .subscribe();
                    
            return () => {
                supabase.removeChannel(subscription);
            }
        }

        getMessages();
    }, [channelId, channel])

    const sendMessage = async () => {
        if(!newMessage.trim()) return;
        if(!channelId) return;

        const { error } = await supabase.from("messages").insert([
            {
                user_id: session.user.id,
                channel_id: channelId,
                content: newMessage,
            }
        ]);

        if(error){
            console.error(error);
        } else{
            setNewMessage("");
        }
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages])


  return (
    <div className="h-screen flex flex-col bg-gray-100">
        <nav className="flex justify-between items-center p-5 z-10 bg-white shadow-md">
            <Link to="/home"><IoIosCloseCircleOutline className="w-10 h-10" /></Link>
            <h1 className="text-4xl">#{channel}</h1>
            <Link to={`/chat/${channel}/edit`}><PiGearSixBold className="w-10 h-10"/></Link>
        </nav>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className="flex items-center space-x-3">
                    <img src={msg.avatar} alt={msg.username} className="w-10 h-10 rounded-full" />
                    <div className="bg-white p-3 rounded-lg shadow-md max-w-xs min-w-32">
                        <div className="text-sm font-semibold">{msg.username}</div>
                        <p className="text-gray-700">{msg.content}</p>
                        <div className="text-xs text-gray-500 text-right">{msg.created_at}</div>
                    </div>
                </div>
            ))}
            <div ref={messageEndRef} />
        </div>

        <div className="p-4 bg-white shadow-md flex items-center">
            <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="..." value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="cursor-pointer ml-3 p-2 bg-blue-500 text-white rounded-lg">
                <IoIosSend className="w-6 h-6" />
            </button>
        </div>
    </div>
  )
}

export default Chat
