import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase'

const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {

        // update session when changes
        const {data: { subscription }} = supabase.auth.onAuthStateChange(
            (event, session) => {
                if(event === "SIGNED_OUT"){
                    setSession(null);
                } else if(session){
                    setSession(session);
                }
            }
        )

        // clean up listener when component unmounts
        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => {
    return useContext(SessionContext);
}

export { SessionProvider, useSession}