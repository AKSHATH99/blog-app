import React, { Children } from 'react'
import axios from 'axios'
import { createContext  , useEffect , useState } from 'react'
import {URL} from '../url.js'

export const UserContext = createContext({})

export default function  UserContextProvider({children}){
    // const [user , setUser] = useState(null);
    const [user , setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(URL + "/api/auth/refetch", { withCredentials: true });
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    return (
        <div>
            <UserContext.Provider value={(user , setUser)}>
                {children}
            </UserContext.Provider>
        </div>
    )
}


