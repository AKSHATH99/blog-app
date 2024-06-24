import React from 'react'
import { useContext } from 'react'
import {UserContext} from "../context/UserContext.js"
import axios from 'axios';
import {Link, NavLink, useNavigate} from "react-router-dom";  

const Menu = () => {
    const {user} = useContext(UserContext);
    const  {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
           const  res =  await  axios.get("/api/auth/logout", {withCredentials:true})
           setUser(null);
           navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <div className='bg-black  w-[200px] right-6  z-10 flex flex-col items-start  absolute top-12  p-4 space-y-4'>
        {
            !user  && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' >
                <Link to ='/login'>LOGIN</Link>
            </h3>
        }
        {
            !user  && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' >
                <Link to ='/register'>REGISTER</Link>
            </h3>
        }
        
        
        {
            user  && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' >
                <Link to ={'/profile'+ user._id } >PROFILE</Link>
            </h3>
        }
        {
            user  && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' >
                <Link to ={'/write'}  >Write blog</Link>
            </h3>
        }
        {
            user  && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' >
                <Link to ={'/myblogs'+ user._id}  >My blog</Link>
            </h3>
        }
        {
            user  && <h3 onClick={handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer' >
                    LOGOUT
            </h3>
        }
    </div>
  )
}

export default Menu
