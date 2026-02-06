import React from 'react'
import {RoughNotation} from "react-rough-notation"

const Dashboard = () => {
  return (
    <>
    
    <div className='bg-[url(https://img.freepik.com/free-vector/empty-warehouse-hangar-interior-realistic-vector_1441-3882.jpg?semt=ais_hybrid&w=740&q=80)] bg-opacity-90 bg-no-repeat bg-cover min-h-[80vh] flex items-center justify-center bg-blur-3xl'>
      <div className='flex items-center flex-col justify-center max-w-4xl text-gray-300 bg-gray-500/50 rounded-2xl border border-gray-500 border-2 p-10 gap-5'>
        <h1 className='font-extrabold text-5xl'>Welcome to Park To Go</h1>
        <p className='text-center text-2xl'>Park To Go is a smart, web-based parking stand management system designed to make parking simple, fast, and efficient. The platform automates the entire parking process—from vehicle entry and token generation to real-time monitoring and bill generation—helping parking operators manage vehicles with ease and accuracy.</p>
      </div>
    </div>

    <div className='py-20 flex flex-col items-center justify-center gap-35 px-30 relative'>
      <div className='absolute top-15 left-35 rotate-50 animate-bounce'><img src="https://clipart-library.com/img/2006191.jpg" alt="" className='h-15'/></div>
      <div className='absolute top-35 right-35 rotate-20 animate-pulse'><img src="https://media.istockphoto.com/id/855073082/vector/car-icon-black-minimalist-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=fj1uxpgx_scw8uAAjv_oh-WB1-TC7bgs6TgaLCFWbrw=" alt="" className='h-25'/></div>
      <h1 className='text-white text-5xl'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        About ParkToGo
        </RoughNotation>
      </h1>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-40 '>
        <div className='flex flex-col justify-center px-4 text-justify gap-10'>
          <h1 className='text-center font-semibold text-2xl'>Why Park To Go?</h1>
          <ul className='list-disc '>
            <li>Quick Park & Go - Register vehicles instantly and minimize waiting time.</li>
            <li>Smart Token Generation - Automatically generate unique parking tokens for secure vehicle tracking.</li>
            <li>Real-Time Parking Tracking - Monitor parked vehicles, duration, and slot availability live.</li>
            <li>Instant Bill Generation - Accurate billing based on parking time and vehicle type.</li>
            <li>Web-Based System - Access anytime, anywhere—no manual registers needed.</li>
          </ul>
        </div>

        <div className='flex flex-col justify-center px-10 text-justify gap-10'>
          <h1 className='text-center font-semibold text-2xl'>How Park To Go Works?</h1>
          <ul className='text-lg list-decimal'>
            <li><p className='tracking-[.18rem]'>Vehicle Enters – Details are recorded instantly</p></li>
            <li><p className='tracking-[.18rem]'>Token Issued – Unique token generated for each vehicle</p></li>
            <li><p className='tracking-[.18rem]'>Park Safely – System tracks time and availability</p></li>
            <li><p className='tracking-[.18rem]'>Pay & Go – Bill generated instantly at exit</p></li>
          </ul>
        </div>
      </div>

      

    </div>

    </>
  )
}

export default Dashboard