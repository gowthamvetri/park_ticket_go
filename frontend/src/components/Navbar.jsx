import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/AuthContext"
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { FaCarAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    const {isAuth} = useAuth()
    const {role,logout} = useAuth()
    const [user,setUser] = useState({})

    const userList = [
        {title:"Home",loc:"/dashboard"},
        {title:"Bills",loc:"/bill"},
        {title:"Tokens",loc:"/token"},
        {title:"Profile",loc:"/profile"}
    ]

    const adminList = [
        {title:"Home",loc:"/dashboard"},
        {title:"Bills",loc:"/adminBills"},
        {title:"Tokens",loc:"/adminToken"},
        {title:"Profile",loc:"/profile"},
        {title:"Vehicles",loc:"/vehicles"}
    ]

    console.log(user)

    const navList = role==="User" ? userList : adminList

    const location = useLocation()
    
    const fetchAdmin = async()=>{
        await axios.get("http://localhost:8080/api/getAdmin",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }).then((data)=>setUser(data.data.data)).catch(err=>console.log(err))
    }

    const fetchUser = async()=>{
            await axios.get("http://localhost:8080/api/getInfo",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }).then((data)=>setUser(data.data.data)).catch(err=>console.log(err))
        }

    // console.log(user)
    useEffect(()=>{     
        if(role==="User"){
            fetchUser()
        }
        fetchAdmin()
    },[role])

  return (
    <nav className='flex py-7 px-8 justify-between items-center sticky top-0 bg-gray-300 z-10'>
        <div className='flex items-center gap-2'>
            <h1 className='text-2xl'><FaCarAlt/></h1>
            <h1 className='font-medium text-2xl'>ParkToGo</h1>
        </div>
        { isAuth &&
        <div>
            <ul className='flex gap-7'>
                {
                    navList.map((data,key)=>(
                        <li key={key} className={`${location.pathname==data.loc ? "underline" :""}`}><Link to={data.loc}>{data.title}</Link></li>
                    ))
                }
            </ul>
        </div>
}
        { isAuth &&
        <div className='flex items-center gap-4'>
            <div className='bg-gray-500 p-3 rounded-full text-white'>
                <FaUserAlt/>
            </div>
            <div>
                
                <h3 className='capitalize'>{user.name}</h3>
                <h4>{role}</h4>
            </div>
            <button className='cursor-pointer' onClick={()=>logout()}>Logout</button>
        </div>
}
    </nav>
  )
}

export default Navbar