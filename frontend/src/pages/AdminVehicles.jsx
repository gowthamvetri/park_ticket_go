import React, { useState } from 'react'
import img from "../assets/vehicle.jpg"
import { RoughNotation } from 'react-rough-notation'

const AdminVehicles = () => {

  const [vehicle,setVehicle] = useState([{
    _id:"698aef8800751113fadd01e4",
    vno:"TN45GX5467",
    vmodel:"Pulser",
    user:"698ada5c00751113fadd0073",
    isParked:true,
    parkedAt:"Tue Feb 10 2026 11:25:23 GMT+0530 (India Standard Time)"
  }])
  return (
    <div className='min-h-[80vh] md:px-20 md:py-10 bg-gray-100/80'>
      <h1 className='text-white text-5xl text-center pb-15 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Vehicles Page
        </RoughNotation>
      </h1>
      
    </div>
  )
}

export default AdminVehicles