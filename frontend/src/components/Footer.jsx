import React from 'react'
import {Link} from "react-router-dom"
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
    const navList = [
    {title:"Home",loc:"/dashboard"},
    {title:"Bills",loc:"/bill"},
    {title:"Tokens",loc:"/token"},
    {title:"Profile",loc:"/profile"}
    ]

  return (
    <footer className='bg-gray-500 text-white px-10 py-15'>
        <div className='grid grid-cols-4 gap-x-8 justify-around items-start' >
            <div className='col-span-2 gap-5 flex flex-col'>
                <h1 className='font-semibold text-2xl'>ParkToGo</h1>
                <p className='text-justify md:w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nulla dolore deleniti doloremque non, cupiditate minus unde earum aspernatur explicabo a adipisci quas magnam illo excepturi maxime possimus sequi eligendi.</p>
            </div>

            <div className='flex flex-col gap-5'>
                <h1 className='font-semibold text-2xl'>Navigation</h1>
                <ul>
                    {
                        navList.map((data,key)=>(
                            <li key={key}><Link to={data.loc}>{data.title}</Link></li>
                        ))
                    }
                </ul>
            </div>

            <div className='flex flex-col gap-5'>
                <h1 className='font-semibold text-2xl'>Contact us</h1>
                <ul className='flex gap-3'>
                    <li className='text-4xl'><FaFacebook/></li>
                    <li className='text-4xl'><RiInstagramFill/></li>
                    <li className='text-4xl'><IoLogoWhatsapp/></li>
                    <li className='text-4xl'><FaYoutube/></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer