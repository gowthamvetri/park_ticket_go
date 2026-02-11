import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import img from "../assets/spark.png"
import {RoughNotation} from "react-rough-notation"
import img1 from "../assets/nobill.png"

const BillPage = () => {

  const [bills,setBills] = useState([])
  const location = useNavigate()

  const fetchBills = async()=>{
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAllBills`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setBills(data.data.data)).catch(err=>console.log(err))
  }
  console.log(bills)

  useEffect(()=>{
    fetchBills()
  },[])

  return (
    <div className='min-h-[80vh] md:px-20 md:py-10 bg-gray-100/80'>
      <h1 className='text-white text-5xl text-center pb-15 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Bills Page
        </RoughNotation>
      </h1>
      {
        bills.length==0 &&
        <div className='flex items-center justify-center'>
          <img className='h-[600px] rounded-full' src={img1} alt=""/>
        </div>
      }
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center gap-10'>
        {
          bills.map((data,key)=>{
            return(
              <div className='bg-[url(https://clipart-library.com/new_gallery/66-661719_template-black-white-one-border-png-image-ticket.png)] bg-opacity-90 bg-no-repeat bg-cover w-[410px] h-[220px] flex flex-col items-center justify-center relative cursor-pointer' onClick={()=>location(`/bill/${data._id}`)}>
                <div className='absolute h-2 w-10 -top-2 -left-3 animate-ping'><img src={img} alt="" /></div>
                <div className='absolute h-2 w-10 bottom-7 -right-4 animate-ping'><img src={img} alt="" /></div>
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${data.ispaid ? 'bg-gray-400 text-white' : 'bg-gray-500 text-white'}`}>
                  {data.ispaid ? '✓ PAID' : '✗ UNPAID'}
                </div>
                <div className='flex flex-col items-center justify-center pl-5'>
                  <h1>Total Cost : ₹{data.totalCost}</h1>
                  <h1 >Token id: {data.token.substring(0,7)}...</h1>
                  <h1 >Vehicle id:{data.vehicle.substring(0,7)}...</h1>
                  <h1>{new Date(data.departuredDate).toDateString()+" "+new Date(data.departuredDate).toLocaleTimeString()}</h1>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default BillPage