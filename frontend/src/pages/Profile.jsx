import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import axios from "axios"
import {RoughNotation} from 'react-rough-notation'
import {  toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [isEdit,setIsEdit] = useState(false)
  const [user,setUser] = useState({})
  const notify = (message) => toast.success(message)
  const {role} = useAuth()
  const [password,setPassword] = useState("")

  
  const handleChange = (e)=>{
    setUser((pre)=>({
      ...pre,
      [e.target.name]:e.target.value
    }))
  }

  const handlePass = (e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = async()=>{
    // e.preventDefault()
    if(role==='User'){
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}update`,{
      name:user.name,email:user.email,phone:user.phone 
    }, { headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    notify(res.data.message)
    return
  }
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}changePass`,{
      password:password
    }, { headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    notify(res.data.message)
    console.log(res)
    return

  }

  const handleEdit = (e)=>{
    e.preventDefault()
    if(!isEdit){
      setIsEdit(true)
      return
    }
    handleSubmit()
  }

  const fetchAdmin = async()=>{
          await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAdmin`,{
                  headers:{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                  }
              }).then((data)=>setUser(data.data.data)).catch(err=>console.log(err))
      }
  
      const fetchUser = async()=>{
              await axios.get("${import.meta.env.VITE_BACKEND_URL}getInfo",{
                  headers:{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                  }
              }).then((data)=>setUser(data.data.data)).catch(err=>console.log(err))
          }

  
  console.log(user)
   useEffect(()=>{     
          if(role==="User"){
              fetchUser()
          }
          fetchAdmin()
          // setPassword(user.password)
      },[role])



  return (
    <div>
      <h1 className='text-white text-5xl text-center py-5 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Profile Page
        </RoughNotation>
      </h1>
      <div className='flex flex-col justify-center items-center py-20'>
        <div className='border border-2 border-gray-400 rounded flex flex-col items-center justify-center px-15 py-10 gap-5'>
        <div className='text-8xl'>
          <FaUserCircle/>
        </div>
          <form action="" className='flex flex-col gap-5'>
            {
              role==="User" &&
            <input className='px-4 py-2 border-double border-2 rounded border-gray-400' disabled={!isEdit} type="text" name="name" id="" value={user.name} onChange={handleChange}/>
            }
            
            <input className='px-4 py-2 border-double border-2 rounded border-gray-400' disabled={!isEdit} type="email" name="email" id="" value={user.email} onChange={handleChange}/>
            <h1>Change Password:</h1>
           
            { role==="Admin" &&
              <input className='px-4 py-2 border-double border-2 rounded border-gray-400' disabled={!isEdit} type="password" name="password" id="" value={password} onChange={handlePass}/>
            }

            {
              role==="User" &&
            <input className='px-4 py-2 border-double border-2 rounded border-gray-400' disabled={!isEdit} type="text" name="phone" id="" value={user.phone} onChange={handleChange}/>
            }
            <input className='bg-gray-500/70 py-2 rounded' type="submit" value={!isEdit?"Edit":"Update"} onClick={handleEdit}/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile