import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import car from "../assets/car.mp4"
import axios from "axios"
import {toast} from "react-toastify"

const Register = () => {
    const [user,setUser] = useState({
        email:"",
        name:"",
        phone:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setUser((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        
            try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}register`,{
                name:user.name,
                email:user.email,
                phone:user.phone
            })
            if(response.data.success){
                navigate("/")
                toast.success("Account Registered Successfully")
            }
        }catch(err){
            toast.error("Unable to register "+err)
        }
        toast.error("Unable to create account make sure password are matched")
    }

  return (
    <div className='flex justify-center items-center py-55'>
        {/* <div className='absolute bg-black/50 w-full h-full z-[-1]'></div> */}
        <video autoPlay loop muted className='w-full h-full absolute z-[-2] object-cover inset-0' > <source src={car} type='video/mp4'/> </video>
        <div className='sm:min-w-sm max-w-md min-w-xs bg-gray-300 px-10 py-8 flex flex-col gap-7 scale-110 rounded-tr-[5rem] rounded-bl-[5rem]'>
            <h1 className='text-center text-2xl font-medium'>Register</h1>
            <form action="" className='flex flex-col gap-7'>
                <input className='border p-2 rounded' type="text" placeholder='Jhon' name='name'  onChange={handleChange} value={user.name}/>
                <input className='border p-2 rounded' type="email" placeholder='Email@example.com' name='email' onChange={handleChange} value={user.email}/>
                <input className='border p-2 rounded' type="text" placeholder='8375729467' name='phone' onChange={handleChange} value={user.phone}/>
                <input className='py-2 bg-gray-700 text-white rounded' type="submit" onClick={handleSubmit}/>
            </form>
            <p className='text-center'>Have account already <Link to={'/'} className='text-gray-400'>Login!</Link></p>
        </div>

    </div>
  )
}

export default Register