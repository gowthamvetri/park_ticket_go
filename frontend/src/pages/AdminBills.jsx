import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {RoughNotation} from "react-rough-notation"
import img from "../assets/empty.png"
import { toast } from 'react-toastify'

const AdminBills = () => {

    const [bills,setBills] = useState([])
    const [users,setUsers] = useState([])
    const [vehicles,setVehicles] = useState([])
    const [gen,setGen] = useState(false)
    const [vno,setVno] = useState("")
    const [find,setFind] = useState("")
    const [vid,setVid] = useState("")

    const handleChange = (e)=>{
        setVno(e.target.value)
    }

    const getVehicleId = (vno)=>{
        const response = vehicles.find((vhl)=>vhl.vno==vno)
        // console.log(response)
        handleFilter(response?._id)
    }

    const getUsers = async()=>{
        const response = await axios.get("http://localhost:8080/api/getAllUsers",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        // console.log(response)
        setUsers(response.data.data)

    }

    const getAllVehicle = async()=>{
        const response = await axios.get("http://localhost:8080/api/getAllVehicles",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        setVehicles(response.data.data)
        // console.log(vehicles)
    }

    const fetchBills = async()=>{
        await axios.get("http://localhost:8080/api/getAllGeneratedBills",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        }).then((data)=>setBills(data.data.data)).catch(err=>console.log(err))
    }

    const getVehicleById = (vid)=>{
        const vechl = vehicles.find((vhl)=>vhl._id==vid)
        return vechl?.vno
    }

    const getUserById = (uid) =>{
        // console.log(users)
        const user =users.find((usr)=>usr._id==uid)
        return user?.name
    }

    const handleFilter = (vid) =>{
        const response = bills.filter((bill)=>bill.vehicle==vid)
        if(response.length > 0){
        setBills(response)
        toast.success("Bills retrived successfully")
        }else{
            toast.error("Unable to retrive the bills")
        }
        // console.log(bills.length)
    }

    const handleClearFilter = ()=>{
        setFind("")
        fetchBills()
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
          }).then((data)=>toast.success("Bill generated successfully")).catch(err=>toast.error("Unable to generate bill make sure that token is valid"))
    
          setGen((pre)=>!pre)
          fetchBills()
        }catch(err){
          console.log(err)
        }
        }

    // console.log(bills.length)
    useEffect(()=>{
        fetchBills()
    },[])

    useEffect(()=>{
        getUsers()
        getAllVehicle()
    },[bills])

  return (
    <div className='flex items-center justify-center min-h-[70vh] relative flex-col gap-10'>
        <h1 className='text-white text-5xl text-center py-5 flex flex-col justify-center items-center'>
                <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
                Bills Page
                </RoughNotation>
              </h1>
        {/* <div className='absolute bottom-10 right-10 bg-gray-500/60 p-5 rounded-full text-white' onClick={()=>setGen((pre)=>!pre)}><FaPlus/></div> */}
        {   bills.length > 0 ?
            (<div className='flex flex-col gap-5 items-center'>
                <div className='grid grid-cols-3 w-full gap-5 items-center'>
                    <div className='text-center w-fit'>
                        <label className='w-full text-xl' htmlFor="">Enter the Vehicle number </label>
                    </div>
                    <div className='flex items-center w-full justify-center'>
                        <input type="text" className='border-2 w-full py-3 px-2' onChange={(e)=>setFind(e.target.value)} value={find}/>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type="submit" onClick={()=>getVehicleId(find)}/>
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type="submit" value={"clear"} onClick={()=>handleClearFilter()} />
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type='submit' value={"Add Entry"} onClick={()=>setGen((pre)=>!pre)}/>
                    </div>
                </div>
            <table className='grid grid-cols-1 items-center'>
                <tr className='grid grid-cols-7 border text-2xl'>
                    <th>Bill Id</th>
                    <th>Token Id</th>
                    <th>Vehicle Id</th>
                    <th>User Id</th>
                    <th>Total Cost</th>
                    <th>Payment Status</th>
                    <th>Departured Date</th>
                </tr>
                {
                    bills.map((data,key)=>(
                        <tr key={key} className='grid grid-cols-7 text-center border-collapse'>
                            <td className='border px-2 py-3'>{data._id.substring(0,7)}...</td>
                            <td className='border px-2 py-3'>{data.token.substring(0,7)}...</td>
                            <td className='border px-2 py-3'>{getVehicleById(data.vehicle)}</td>
                            <td className='border px-2 py-3'>{getUserById(data.user)}</td>
                            <td className='border px-2 py-3'>₹{data.totalCost}</td>
                            <td className='border px-2 py-3'>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${data.ispaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {data.ispaid ? '✓ PAID' : '✗ UNPAID'}
                                </span>
                            </td>
                            <td className='border px-2 py-3'>{new Date(data.departuredDate).toLocaleString()}</td>
                        </tr>
                    ))
                }
            </table>
        </div>):(
            <div>
                <img src={img} alt="" />
                <h1 className='text-center text-4xl text-gray-400 animate-bounce'>No bills generated yet . Empty!!!</h1>
            </div>
        )
        }
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