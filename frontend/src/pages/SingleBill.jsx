import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleBill = () => {
    const [bill,setBill] = useState({})
    const [vehicle,setVehicle] = useState({})
    const [token,setToken] = useState({})
    const {id} = useParams()

    const fetchBill = async()=>{
    await axios.get(`http://localhost:8080/api/getBill/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setBill(data.data.data)).catch(err=>console.log(err))
    }

    const fetchVehicle = async()=>{
        await axios.get(`http://localhost:8080/api/getVehicle/${bill?.vehicle}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setVehicle(data.data.data)).catch(err=>console.log(err))
    }

    const fetchToken = async()=>{
        await axios.get(`http://localhost:8080/api/getToken/${bill?.token}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setToken(data.data.data)).catch(err=>console.log(err))
    }

    console.log(bill)
    console.log(vehicle)
    console.log(token)
    
    useEffect(()=>{
        fetchBill()
    },[id])

    useEffect(() => {
        fetchVehicle()
        fetchToken()
    }, [bill])


  return (
    <div className=' px-[10%] py-20 flex items-center'>
        <div className='grid grid-cols-2 items-center gap-10'>
            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-medium'>Bill Information</h1>
                <ul className='text-xl'>
                    <li>Bill id : {bill._id}</li>
                    <li>Token id: {bill.token}</li>
                    <li>Total cost : {bill.totalCost}</li>
                    <li>Vehicle id : {bill.vehicle}</li>
                </ul>
            </div>

            <div>
                <img className='w-[400px] h-[350px]' src="https://cdn-icons-png.flaticon.com/512/9409/9409684.png" alt="" />
            </div>
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

export default SingleBill