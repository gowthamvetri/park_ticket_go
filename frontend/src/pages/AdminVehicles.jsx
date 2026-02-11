import React, { useEffect, useState } from 'react'
import img from "../assets/vehicle.jpg"
import { RoughNotation } from 'react-rough-notation'
import axios from 'axios'
import {toast} from "react-toastify"

const AdminVehicles = () => {

  const [vehicle,setVehicle] = useState([])
  const [user,setUser] = useState([])
  const [find,setFind] = useState("")

  const fetchVehicles = async()=>{
     await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAllVehicles`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
     }).then((data)=>setVehicle(data?.data?.data)).catch((err)=>console.log(err))
  }

  // console.log(vehicle)

  const getUserName = (userId) =>{
    const found = user.find((item)=>item._id==userId)
    return found?.name
  }

  const handleFilter = (find) =>{
    const response = vehicle.filter((vhl)=> vhl.vno==find)
    if(response.length > 0){
    setVehicle(response)
    toast.success("Vehicle retrived successfully");
    }else{
      toast.error("Unable to retrive the vehicles")
    }
  }

  const handleClearFilter = ()=>{
    setFind("")
    fetchVehicles()
  }

  const fetchUser = async() => {
    try{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAllUsers`,{
       headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    // console.log(response)
    if(response.data.success){
      setUser(response.data.data)
    }

  }catch(err){
    console.log(err)
  }
  }

  // console.log(user)

  useEffect(()=>{
    fetchVehicles()
    fetchUser()
  },[])

  const renderVehicles = ()=>{
    return (
      vehicle.map((data)=>(
        
        <div className='bg-gray-200 py-8 flex flex-col items-center justify-center relative rounded-2xl' key={data._id}>
          <span className='absolute -top-2 -right-3 bg-gray-400 px-3 py-1 rounded-xl text-white'>{data.isParked ? "Parked" : "Not Parked"}</span>
          <h1>User Name:{getUserName(data.user)}</h1>
          <h1>VNO:{data.vno}</h1>
          <h1>VModel:{data.vmodel}</h1>
          <h1>ParkedAt:{new Date(data.parkedAt).toLocaleDateString()}</h1>
        </div>
      )
      )
    )
  }
  return (
    <div className='min-h-[80vh] md:px-20 md:py-10 bg-gray-100/80 flex flex-col gap-5'>
      <h1 className='text-white text-5xl text-center pb-15 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Vehicles Page
        </RoughNotation>
      </h1>
      <div className='grid grid-cols-3 w-full gap-5 items-center'>
                    <div className='text-center w-fit'>
                        <label className='w-full text-xl' htmlFor="">Enter the Vehicle number </label>
                    </div>
                    <div className='flex items-center w-full justify-center'>
                        <input type="text" className='border-2 w-full py-3 px-2' onChange={(e)=>{setFind(e.target.value)}} value={find}/>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type="submit" onClick={()=>handleFilter(find)}/>
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type="submit" value={"clear"} onClick={()=>handleClearFilter()} />
                    </div>
                </div>

      <div className='grid grid-cols-3 items-center gap-x-20 gap-y-10'>
        {
          vehicle ? renderVehicles() :(
            <div className='text-center text-4xl'>
              No vehicles
            </div>
          )
        }
      </div>
      
    </div>
  )
}

export default AdminVehicles