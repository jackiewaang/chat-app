import { Link, useParams } from "react-router-dom"
import { IoIosCloseCircleOutline, IoIosSend } from "react-icons/io";
import { PiGearSixBold } from "react-icons/pi";
import { useState, useRef, useEffect } from "react";


const Chat = () => {

    const { channel } = useParams();
    const [messages, setMessages] = useState([
        { id:1, user: "Alice", avatar: "https://i.pravatar.cc/40?u=Alice", content:"Hello", timestamp: "21:58 PM" },
        { id:2, user: "Bob", avatar: "https://i.pravatar.cc/40?u=Bob", content: "Hey", timestamp: "21:59PM"},
    ])
    const [newMessage, setNewMessage] = useState("");
    const messageEndRef = useRef(null);

    const sendMessage = () => {
        if(!newMessage.trim()) return;

        const newMsg = {
            user: "Jackie",
            avatar: "https://i.pravatar.cc/40?u=Jackie",
            content: newMessage,
            timestamp: new Date().toISOString(),
            channel: channel,
        }

        setMessages([...messages, newMsg]);
        setNewMessage("");
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
                    <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full" />
                    <div className="bg-white p-3 rounded-lg shadow-md max-w-xs min-w-32">
                        <div className="text-sm font-semibold">{msg.user}</div>
                        <p className="text-gray-700">{msg.content}</p>
                        <div className="text-xs text-gray-500 text-right">{msg.timestamp}</div>
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
