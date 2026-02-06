import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import img from "../assets/spark.png"
import {RoughNotation} from "react-rough-notation"

const BillPage = () => {

  const [bills,setBills] = useState([])
  const location = useNavigate()

  const fetchBills = async()=>{
    await axios.get("http://localhost:8080/api/getAllBills",{
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
    <div className='min-h-[80vh] md:px-20 md:py-10'>
      <h1 className='text-white text-5xl text-center pb-15 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Bills Page
        </RoughNotation>
      </h1>
      {
        bills.length==0 &&
        <div className='flex items-center justify-center'>
          <img className='h-[600px]' src="https://scontent.fcjb3-5.fna.fbcdn.net/v/t39.30808-6/481207972_1182760683855241_2523634183229614742_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Y-IikwCeT7cQ7kNvwGyUVY-&_nc_oc=AdlaIQo71GXrruIqlx4L8zg6WCytcDNC25G_KWPc5405zbpjTYI-jZNdh2T3LTsJ9ww&_nc_zt=23&_nc_ht=scontent.fcjb3-5.fna&_nc_gid=6OABHVJpi1dmdpmDrYtQcQ&oh=00_Afvf7l4UMhS1xtDj1WCFmXQr5-IH2B2g2BOgrjj-tLZcjw&oe=6984147C" alt="" />
        </div>
      }
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center gap-10'>
        {
          bills.map((data,key)=>{
            return(
              <div className='bg-[url(https://clipart-library.com/new_gallery/66-661719_template-black-white-one-border-png-image-ticket.png)] bg-opacity-90 bg-no-repeat bg-cover w-[410px] h-[220px] flex flex-col items-center justify-center relative cursor-pointer' onClick={()=>location(`/bill/${data._id}`)}>
                <div className='absolute h-2 w-10 -top-2 -left-3 animate-ping'><img src={img} alt="" /></div>
                <div className='absolute h-2 w-10 bottom-7 -right-4 animate-ping'><img src={img} alt="" /></div>
                <div className='flex flex-col items-center justify-center pl-5'>
                  <h1>Total Cost : {data.totalCost}</h1>
                  <h1 >Token id: {data.token}</h1>
                  <h1 >Vehicle id:{data.vehicle}</h1>
                  <h1>{data.departuredDate}</h1>
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