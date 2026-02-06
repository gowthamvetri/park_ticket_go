import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import car from "../assets/car.mp4"

const Register = () => {
    const [user,setUser] = useState({
        email:"",
        consfirmPass:"",
        password:""
    })

    const handleChange = (e)=>{
        setUser((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        console.log(user)
    }

  return (
    <div className='flex justify-center items-center py-55'>
        <div className='absolute bg-black/50 w-full h-full z-[-1]'></div>
        <video autoPlay loop muted className='w-full h-full absolute z-[-2] object-cover inset-0' > <source src={car} type='video/mp4'/> </video>
        <div className='sm:min-w-sm max-w-md min-w-xs bg-gray-300 px-7 py-8 flex flex-col gap-7 scale-110 rounded-tr-[5rem] rounded-bl-[5rem]'>
            <h1 className='text-center text-2xl font-medium'>Register</h1>
            <form action="" className='flex flex-col gap-7'>
                <input className='border p-2 rounded' type="email" placeholder='Email@example.com' name='email' onChange={handleChange} value={user.email}/>
                <input className='border p-2 rounded' type="password" placeholder='Password' name='password'  onChange={handleChange} value={user.password}/>
                <input className='border p-2 rounded' type="password" placeholder='Confirm Password' name='consfirmPass' onChange={handleChange} value={user.consfirmPass}/>
                <input className='py-2 bg-gray-700 text-white rounded' type="submit" onClick={handleSubmit}/>
            </form>
            <p className='text-center'>Have account already <Link to={'/'} className='text-gray-400'>Login!</Link></p>
        </div>

    </div>
  )
}

export default Register