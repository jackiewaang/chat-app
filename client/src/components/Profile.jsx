import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../supabase'
import { IoIosExit } from "react-icons/io";


const Profile = () => {

    const { username } = useParams();
    const navigate = useNavigate();

    const signout = async () => {
        setTimeout(async () => {
            const { error } = await supabase.auth.signOut();

            if(error){
                console.error(error);
            } else{
                navigate('/');
            }
        }, 100)
    }

  return (
    <div className='h-screen p-6 flex'>
        <div className='flex flex-1 flex-col items-center'>
            <div className='w-24 h-24 rounded-full overflow-hidden border mb-3'>
                <img src={`https://ui-avatars.com/api/?name=${username}`} alt="profile" className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col items-center gap-3 justify-center '>
                <h1 className='text-3xl font-semibold'>{username}</h1>
                <p className='text-sm text-gray-500'>Name</p>
                <p className='text-sm text-gray-700 mt-2 max-w-md'>
                    Biography
                </p>
            </div>
            
            <button className='cursor-pointer mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                Edit Profile
            </button>
        </div>
        <div className='top-0'>
            <IoIosExit onClick={signout} className='w-6 h-6 cursor-pointer'/>
        </div>
    </div>
  )
}

export default Profile
