import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import URL from '../url'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js'

const Register = () => {
 
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");
    const navigate  = useNavigate();

    const handleRegister = async()=>{
        try {
            const res = await axios.post(URL + '/api/auth/register',{
                username , password , email
            })
            setUsername(res.data.username)
            setUsername(res.data.email)
            setUsername(res.data.password)
            setError(false)
            navigate('/login')
        } catch (err) {
            setError(true);
            console.log(err)
        }
    }

  return (
    <div>
      <div className='flex items-center'>
        <h1>
            <Link to=''> bloggie</Link>
        </h1>
        <h1>
            <Link to=''> login</Link>
        </h1>
      </div>

      <div className='w-full flex justify-center items-center h-[80vh]'>
        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
            <h1 className='text-xl  font-bold text-left'>
                CREATE YOUR ACCOUNT 
            </h1>
            <input onChange={(e)=> setUsername(e.target.value)} className='w-full px-4 py-4 border-black'/>
            <input onChange={(e)=> setEmail(e.target.value)} className='w-full px-4 py-4 border-black'/>
            <input onChange={(e)=> setPassword(e.target.value)} className='w-full px-4 py-4 border-black'/>

            <button onClick={handleRegister} className='w-full  px-4 py-4 text-lg bg-black text-white rounded-lg'>REGISTER </button>

            {
                error && <h3 className='text-red-500'> SOMETHING WENT WRONG</h3>
            }
        </div>

            <div className='flex justify-center items-center space-x-3'>
                <p>ALREADY HAVE ACCOUNT </p>
                <p className="">    
                    <Link to = '/login'>LOGIN </Link>
                </p>
            </div>
      </div>

      <div>
        <Footer/>
      </div>
    </div>
    
  )
}

export default Register
