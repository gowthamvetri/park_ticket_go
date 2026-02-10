import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../context/AuthContext'
import car from "../assets/car.mp4"

const Login = () => {
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const {login,isAuth} = useAuth()

    const handleChange = (e)=>{
        setUser((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try{
            await axios.post("http://localhost:8080/api/login",{
                email:user.email,
                password:user.password
            }).then((data)=>{
                console.log(data.data)
                login({token:data.data.token})
                navigate("/dashboard")
            })
            
        }
        catch(err){
            console.log(err)
        }
       
    }

    useEffect(()=>{
        if(isAuth){
            navigate("/dashboard")
        }
    },[])

  return (
    <div className='flex justify-center items-center relative py-60'>
        {/* <div className='absolute bg-black/50 w-full h-full z-[-1]'></div> */}
        <video autoPlay loop muted className='w-full h-full absolute z-[-2] object-cover inset-0' > <source src={car} type='video/mp4'/> </video>
        <div className='sm:min-w-sm max-w-md min-w-xs bg-gray-300/90 border-2 border-gray-300 px-10 py-12 scale-110 flex flex-col gap-7 rounded-tl-[5rem] rounded-br-[5rem]'>
            <h1 className='text-center text-2xl font-medium'>Login</h1>
            <form action="" className='flex flex-col gap-7'>
                <input className='border p-2 rounded' type="email" placeholder='Email@example.com' name='email' value={user.email} onChange={handleChange}/>
                <input className='border p-2 rounded' type="password" placeholder='Password' name='password' value={user.password} onChange={handleChange}/>
                <input className='py-2 bg-gray-700 text-white rounded' type="submit" onClick={handleSubmit}/>
            </form>
            <p className='text-center'>Not Registered Yet <Link to={'/register'} className='text-gray-400'>Registered ?</Link></p>
        </div>

    </div>
  )
}

export default Login