import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {RoughNotation} from "react-rough-notation"
import img from "../assets/empty.png"

const AdminTokens = () => {

    const [bills,setBills] = useState([])
    const [users,setUsers] = useState([])
    const [gen,setGen] = useState(false)
    const [data,setData] = useState({
      name:"",
      email:"",
      phone:"",
      vno:"",
      vmodel:""
    })

    const handleChange  = (e)=>{
      e.preventDefault()
      setData((pre)=>({
        ...pre,[e.target.name]:e.target.value
      }))
    }

    const getUsers = async()=>{
        bills.forEach(async(data)=>{
            await axios.get(`http://localhost:8080/api/getUser/${data.user}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        }).then((data)=>setUsers((pre)=>[...pre,data.data.data.name])).catch(err=>console.log(err))
        })
    }


    const fetchBills = async()=>{
        await axios.get("http://localhost:8080/api/getAllGeneratedTokens",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        }).then((data)=>setBills(data.data.data)).catch(err=>console.log(err))
    }

    const handleGenToken = async(e)=>{
      e.preventDefault()

      try{
      await axios.post("http://localhost:8080/api/generateToken",{
        data
      },{
        headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
      }).then((data)=>console.log(data)).catch(err=>console.log(err))

      setGen((pre)=>!pre)
      fetchBills()
      
    }catch(err){
      console.log(err)
    }
    }

    console.log(bills)
    useEffect(()=>{
        fetchBills()
    },[])

    useEffect(()=>{
        getUsers()
    },[bills])

  return (
    <div className='flex items-center justify-center min-h-[70vh] relative flex-col gap-10'>
      <h1 className='text-white text-5xl text-center py-5 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Token Page
        </RoughNotation>
      </h1>
        <div className='absolute bottom-10 right-10 bg-gray-500/60 p-5 rounded-full text-white' onClick={()=>setGen((pre)=>!pre)}><FaPlus/></div>
        { bills.length > 0 ?
        (<div>
            <table className='grid grid-cols-1 items-center'>
                <tr className='grid grid-cols-6 border text-2xl'>
                    <th>Token Id</th>
                    <th>Vehicle Id</th>
                    <th>Vehicle No</th>
                    <th>User Id</th>
                    <th>parkedAt</th>
                    <th>IsValid</th>
                </tr>
                {
                    bills.map((data,key)=>(
                        <tr key={key} className='grid grid-cols-6 text-center border-collapse'>
                            <td className='border px-2 py-3'>{data._id}</td>
                            <td className='border px-2 py-3'>{data.vehicle}</td>
                            <td className='border px-2 py-3'>{data.vno}</td>
                            <td className='border px-2 py-3'>{users[key]}</td>
                            <td className='border px-2 py-3'>{new Date(data.parkedAt).toLocaleString()}</td>
                            <td className='border px-2 py-3'>{data.isValid ? "True" : "False"}</td>
                        </tr>
                    ))
                }
            </table>
        </div>) : (
              <div>
                <img src={img} alt="" />
                <h1 className='text-center text-4xl text-gray-400 animate-bounce'>No tokens generated yet . Empty!!!</h1>
            </div>
        )
}
        {
            gen && (
                <div className='absolute w-full h-full bg-black/40 flex items-center justify-center'>
                    <div className='bg-white py-7 px-15 flex flex-col gap-3 rounded-xl'>
                        <h1>Generate Bill</h1>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="">Enter Name</label>
                            <input type="text" name='name' className='border px-5 py-2 rounded-2xl' onChange={handleChange} value={data.name}/>
                            <label htmlFor="">Enter Email</label>
                            <input type="text" name='email' className='border px-5 py-2 rounded-2xl' onChange={handleChange} value={data.email}/>
                            <label htmlFor="">Enter Phone</label>
                            <input type="text" name='phone' className='border px-5 py-2 rounded-2xl' onChange={handleChange} value={data.phone}/>
                            <label htmlFor="">Enter Vehicle Number</label>
                            <input type="text" name='vno' className='border px-5 py-2 rounded-2xl' onChange={handleChange} value={data.vno}/>
                            <label htmlFor="">Enter Vehicle Model</label>
                            <input type="text" name='vmodel' className='border px-5 py-2 rounded-2xl' onChange={handleChange} value={data.vmodel}/>
                        </div>
                        <button className='bg-gray-400 py-2 rounded-2xl' onClick={handleGenToken}>Submit</button>
                        <button className='bg-gray-400 py-2 rounded-2xl' onClick={()=>setGen((pre)=>!pre)}>Close</button>
                    </div>
                </div>
            )
        }
    </div>


  )
}

export default AdminTokens