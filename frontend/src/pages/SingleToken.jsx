import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleToken = () => {
    const [vehicle,setVehicle] = useState({})
    const [token,setToken] = useState({})
    const {id} = useParams()

    const fetchVehicle = async()=>{
        await axios.get(`http://localhost:8080/api/getVehicle/${token?.vehicle}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setVehicle(data.data.data)).catch(err=>console.log(err))
    }

    const fetchToken = async()=>{
        await axios.get(`http://localhost:8080/api/getToken/${id}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setToken(data.data.data)).catch(err=>console.log(err))
    }

    console.log(vehicle)
    console.log(token)
    
    useEffect(()=>{
      fetchToken()
    },[id])

    useEffect(() => {
        fetchVehicle()
    }, [token])


  return (
    <div className=' px-[10%] py-20 flex items-center'>
        <div className='grid grid-cols-2 items-center gap-10'>
            <div>
                <img className='w-[500px] h-[350px]' src="https://as2.ftcdn.net/jpg/01/82/21/75/1000_F_182217564_SjrGAel4jpR7ibL469csR0mC9OZHXFkp.jpg" alt="" />
            </div>

            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-medium'>Vehicle Information</h1>
                <ul className='text-xl'>
                    <li>Vehicle id : {vehicle._id}</li>
                    <li>Lastly Parked At: {vehicle.parkedAt}</li>
                    <li>Vehicle model : {vehicle.vmodel}</li>
                    <li>Vehicle Number : {vehicle.vno}</li>
                </ul>
            </div>

            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-medium'>Token Information</h1>
                <ul className='text-xl'>
                    <li>Token id : {token._id}</li>
                    <li>Parked At: {token.parkedAt}</li>
                    <li>Vehicle id : {token.vehicle}</li>
                </ul>
            </div>

            <div>
                <img className='w-[500px] h-[350px]' src="https://i.ebayimg.com/images/g/II4AAOSwYzRlQ4oV/s-l1200.jpg" alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default SingleToken