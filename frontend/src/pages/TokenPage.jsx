import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import img from "../assets/spark.png"
import img1 from "../assets/notoken.jpg"

import {RoughNotation} from "react-rough-notation"

const TokenPage = () => {

  const [tokens,setTokens] = useState([])
  const location = useNavigate()

  const fetchBills = async()=>{
    await axios.get("http://localhost:8080/api/getAllTokens",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setTokens(data.data.data)).catch(err=>console.log(err))
  }
  console.log(tokens)

  useEffect(()=>{
    fetchBills()
  },[])

  

  return (
    <div className='min-h-[80vh] md:px-20 md:py-10 bg-gray-100/80'>
      <h1 className='text-white text-5xl text-center pb-15 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Tokens Page
        </RoughNotation>
      </h1>
      {
        tokens.length==0 &&
          <div className='flex items-center justify-center'>
            <img className='h-[600px] rounded-full' src={img1} alt=""/>
          </div>
            }
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center gap-10'>
        {
          tokens.map((data,key)=>{
            return(
              <div className="bg-[url(https://t3.ftcdn.net/jpg/06/47/28/24/360_F_647282434_Ld7DJpnBZXP3CuuvdXeWND4qIoSMop5H.jpg)] bg-opacity-90 bg-no-repeat bg-cover w-[480px] h-[210px] flex flex-col items-center justify-center relative object-contain cursor-pointer rotate-180" onClick={()=>location(`/token/${data._id}`)}>
                <div className='absolute rotate-180 -bottom-4 -left-4 bg-gray-400 px-4 py-1 rounded-lg'>{data.isValid?"Valid":"Invalid"}</div>
                <div className='absolute h-2 w-10 -top-2 -left-3 animate-ping'><img src={img} alt="" /></div>
                <div className='absolute h-2 w-10 bottom-7 -right-4 animate-ping'><img src={img} alt="" /></div>
                <div className='flex flex-col items-center justify-center pl-5 rotate-180'>
                  <h1 >Token id: {data._id.substring(0,7)}...</h1>
                  <h1>Vehicle No : {data.vno}</h1>
                  <h1 >Vehicle id:{data.vehicle.substring(0,7)}...</h1>
                  <h1 >{new Date(data.parkedAt).toDateString()+" "+new Date(data.parkedAt).toLocaleTimeString()}</h1>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TokenPage