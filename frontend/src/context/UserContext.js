import React, { Children } from 'react'
import axios from 'axios'
import { createContext  , useEffect , useState } from 'react'
import {URL} from '../url.js  '

export const UserContext = createContext({})

export default function  UserContextProvider({children}){
    const [user , setuser] = useState(null);

    useEffect(()=>{
        getUser();
    },[])
}

const getUser = async()=>{
    try{
        const res = await axios.get(URL + "/api/auth/refetch",{withCredentials:true} )
        setuser(res.data);
    }catch(err){
        console.log(err)
    }

    return (
        <div>
            <UserContext.Provider value={(user , setuser)}>
                <Children/>
            </UserContext.Provider>
        </div>
    )
}

