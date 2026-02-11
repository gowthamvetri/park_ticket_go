import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {RoughNotation} from "react-rough-notation"
import img from "../assets/empty.png"
import {toast} from "react-toastify"

const AdminTokens = () => {

    const [tokens,setTokens] = useState([])
    const [users,setUsers] = useState([])
    const [gen,setGen] = useState(false)
    const [data,setData] = useState({
      name:"",
      email:"",
      phone:"",
      vno:"",
      vmodel:""
    })
    const [find,setFind] = useState("")

    const handleChange  = (e)=>{
      e.preventDefault()
      setData((pre)=>({
        ...pre,[e.target.name]:e.target.value
      }))
    }

    const getUsers = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAllUsers`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        // console.log(response)
        setUsers(response.data.data)
    }


    const fetchTokens = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAllGeneratedTokens`,{
             headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(response)
        setTokens(response.data.data)
    }

    const getUserById = (uid) =>{
        const user = users.find((usr)=>usr._id==uid)
        return user?.name
    }

    const handleFilter = (find)=>{
        const token = tokens.filter((tkn)=>tkn.vno==find)
        if(token.length > 0){
            setTokens(token)
            toast.success("Token retrived Successfully")
        }else{
            toast.error("Unable to find the token")
        }
    }

    const handleClearFilter = ()=>{
        setFind("");
        fetchTokens()
    }



    const handleGenToken = async(e)=>{
      e.preventDefault()
        
    

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}generateToken`,data,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      
    if(response.data.success){
            toast.success("Token generated successfully");
      }else{
        toast.error(response.data.message)
      }
  
    setGen((pre)=>!pre)
    fetchTokens()
    
    }
    useEffect(()=>{
        fetchTokens()
    },[])

    useEffect(()=>{
        getUsers()
    },[tokens])

  return (
    <div className='flex items-center justify-center min-h-[70vh] relative flex-col gap-10'>
      <h1 className='text-white text-5xl text-center py-5 flex flex-col justify-center items-center'>
        <RoughNotation type='highlight' animate={true} animationDelay={100} show animationDuration={2000} color='gray' padding={[25,25,25,25]} strokeWidth={10}>
        Token Page
        </RoughNotation>
      </h1>
        {/* <div className='absolute bottom-10 right-10 bg-gray-500/60 p-5 rounded-full text-white' onClick={()=>setGen((pre)=>!pre)}><FaPlus/></div> */}
        { tokens.length > 0 ?
        (<div className='flex flex-col gap-5 items-center'>
            <div className='grid grid-cols-3 w-full gap-5 items-center'>
                    <div className='text-center w-fit'>
                        <label className='w-full text-xl' htmlFor="">Enter the Vehicle number </label>
                    </div>
                    <div className='flex items-center w-full justify-center'>
                        <input type="text" className='border-2 w-full py-3 px-2' onChange={(e)=>{setFind(e.target.value)}} value={find}/>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type="submit" onClick={()=>handleFilter(find)}/>
                        <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type="submit" value={"clear"} onClick={()=>handleClearFilter()} />
                         <input className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer capitalize' type='submit' value={"Add Entry"} onClick={()=>setGen((pre)=>!pre)}/>
                    </div>
                </div>
            <table className='grid grid-cols-1 items-center'>
                <tr className='grid grid-cols-6 border text-2xl'>
                    <th>Token Id</th>
                    <th>Vehicle Id</th>
                    <th>Vehicle No</th>
                    <th>User Name</th>
                    <th>parkedAt</th>
                    <th>IsValid</th>
                </tr>
                {
                    tokens.map((data,key)=>(
                        <tr key={key} className='grid grid-cols-6 text-center border-collapse'>
                            <td className='border px-2 py-3'>{data._id.substring(0,7)}...</td>
                            <td className='border px-2 py-3'>{data.vehicle.substring(0,7)}...</td>
                            <td className='border px-2 py-3'>{data.vno}</td>
                            <td className='border px-2 py-3'>{getUserById(data.user)}</td>
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