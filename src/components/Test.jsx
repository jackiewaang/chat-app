import React, { useEffect } from 'react'
import { useSession } from './SessionContext'
import supabase from '../supabase';
import { useNavigate } from 'react-router-dom';

const Test = () => {

    const session = useSession();
    const navigate = useNavigate();

    useEffect(() => {
      const signout = async () => {
        const { error } = await supabase.auth.signOut();

        if(error){
          console.error(error);
        } else{
          navigate("/");
        }
      }
      
      signout();
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default Test
