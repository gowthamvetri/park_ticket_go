import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {RoughNotation} from "react-rough-notation"

const AdminBills = () => {

    const [bills,setBills] = useState([])
    const [users,setUsers] = useState([])
    const [vehicles,setVehicles] = useState([])
    const [gen,setGen] = useState(false)
    const [vno,setVno] = useState("")

    const handleChange = (e)=>{
        setVno(e.target.value)
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

    const getVehicles = async()=>{
        bills.forEach(async(data)=>{
            await axios.get(`http://localhost:8080/api/getAllVehicle/${data.vehicle}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        }).then((data)=>setVehicles((pre)=>[...pre,data.data.data.vno])).catch(err=>console.log(err))
        })
    }

    const fetchBills = async()=>{
        await axios.get("http://localhost:8080/api/getAllGeneratedBills",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        }).then((data)=>setBills(data.data.data)).catch(err=>console.log(err))
    }

    const handleGenBill = async(e)=>{
          e.preventDefault()
    
          try{
          await axios.post("http://localhost:8080/api/generateBill",{
            vno:vno
          },{
            headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
          }).then((data)=>console.log(data)).catch(err=>console.log(err))
    
        //   setGen((pre)=>!pre)
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
        getVehicles()
    },[bills])

  return (
    <div className='flex items-center justify-center min-h-[70vh] relative flex-col gap-10'>
        <h1 className='text-white text-5xl text-center py-5 flex flex-col justify-center items-center'>
                <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
                Bills Page
                </RoughNotation>
              </h1>
        <div className='absolute bottom-10 right-10 bg-gray-500/60 p-5 rounded-full text-white' onClick={()=>setGen((pre)=>!pre)}><FaPlus/></div>
        <div>
            <table className='grid grid-cols-1 items-center'>
                <tr className='grid grid-cols-6 border text-2xl'>
                    <th>Bill Id</th>
                    <th>Token Id</th>
                    <th>Vehicle Id</th>
                    <th>User Id</th>
                    <th>Total Cost</th>
                    <th>Departured Date</th>
                </tr>
                {
                    bills.map((data,key)=>(
                        <tr key={key} className='grid grid-cols-6 text-center border-collapse'>
                            <td className='border px-2 py-3'>{data._id}</td>
                            <td className='border px-2 py-3'>{data.token}</td>
                            <td className='border px-2 py-3'>{vehicles[key]}</td>
                            <td className='border px-2 py-3'>{users[key]}</td>
                            <td className='border px-2 py-3'>{data.totalCost}</td>
                            <td className='border px-2 py-3'>{new Date(data.departuredDate).toLocaleString()}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
        {
            gen && (
                <div className='absolute w-full h-full bg-black/40 flex items-center justify-center'>
                    <div className='bg-white py-7 px-15 flex flex-col gap-8 rounded-xl'>
                        <h1>Generate Bill</h1>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="">Enter Vehicle Number</label>
                            <input type="text" className='border px-5 py-2 rounded-2xl' onChange={handleChange}/>
                        </div>
                        <button className='bg-gray-400 py-2 rounded-2xl' onClick={handleGenBill}>Submit</button>
                        <button className='bg-gray-400 py-2 rounded-2xl' onClick={()=>setGen((pre)=>!pre)}>Close</button>
                    </div>
                </div>
            )
        }
    </div>


  )
}

export default AdminBills