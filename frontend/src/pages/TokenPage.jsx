import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import img from "../assets/spark.png"

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
    <div className='min-h-[80vh] md:px-20 md:py-10'>
      <h1 className='text-white text-5xl text-center pb-15 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Tokens Page
        </RoughNotation>
      </h1>
      {
              tokens.length==0 &&
              <div className='flex items-center justify-center'>
                <img className='h-[600px]' src="https://scontent.fcjb3-5.fna.fbcdn.net/v/t39.30808-6/481207972_1182760683855241_2523634183229614742_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Y-IikwCeT7cQ7kNvwGyUVY-&_nc_oc=AdlaIQo71GXrruIqlx4L8zg6WCytcDNC25G_KWPc5405zbpjTYI-jZNdh2T3LTsJ9ww&_nc_zt=23&_nc_ht=scontent.fcjb3-5.fna&_nc_gid=6OABHVJpi1dmdpmDrYtQcQ&oh=00_Afvf7l4UMhS1xtDj1WCFmXQr5-IH2B2g2BOgrjj-tLZcjw&oe=6984147C" alt="" />
              </div>
            }
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center gap-10'>
        {
          tokens.map((data,key)=>{
            return(
              <div className="bg-[url(https://t3.ftcdn.net/jpg/06/47/28/24/360_F_647282434_Ld7DJpnBZXP3CuuvdXeWND4qIoSMop5H.jpg)] bg-opacity-90 bg-no-repeat bg-cover w-[480px] h-[210px] flex flex-col items-center justify-center relative object-contain cursor-pointer rotate-180" onClick={()=>location(`/token/${data._id}`)}>
                <div className='absolute h-2 w-10 -top-2 -left-3 animate-ping'><img src={img} alt="" /></div>
                <div className='absolute h-2 w-10 bottom-7 -right-4 animate-ping'><img src={img} alt="" /></div>
                <div className='flex flex-col items-center justify-center pl-5 rotate-180'>
                  <h1 >Token id: {data._id}</h1>
                  <h1>Vehicle No : {data.vno}</h1>
                  <h1 >Vehicle id:{data.vehicle}</h1>
                  <h1 className='text-xs'>{data.parkedAt}</h1>
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