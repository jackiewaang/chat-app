import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../supabase'


const Profile = () => {

    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try{
                const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single();

                if(error){
                    console.log(error);
                };

                setProfile(data);
            } catch(err){
                setError('Profile not found:', err);
            } finally{
                setLoading(false);
            }
        }

        getProfile();
    }, [username])

  return (
    <div>
      Profile di {username}
    </div>
  )
}

export default Profile
