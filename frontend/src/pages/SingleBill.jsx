import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const SingleBill = () => {
    const [bill,setBill] = useState({})
    const [vehicle,setVehicle] = useState({})
    const [token,setToken] = useState({})
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    const fetchBill = async()=>{
    await axios.get(`http://localhost:8080/api/getBill/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setBill(data.data.data)).catch(err=>console.log(err))
    }

    const fetchVehicle = async()=>{
        await axios.get(`http://localhost:8080/api/getVehicle/${bill?.vehicle}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setVehicle(data.data.data)).catch(err=>console.log(err))
    }

    const fetchToken = async()=>{
        await axios.get(`http://localhost:8080/api/getToken/${bill?.token}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then((data)=>setToken(data.data.data)).catch(err=>console.log(err))
    }

    console.log(bill)
    console.log(vehicle)
    console.log(token)

    const handlePayment = async () => {
        if (bill.ispaid) {
            toast.info('This bill is already paid!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/api/create-checkout-session',
                { billId: id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                // Redirect to Stripe checkout
                window.location.href = response.data.data.url;
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.response?.data?.message || 'Error creating payment session');
            setLoading(false);
        }
    };
    
    useEffect(()=>{
        fetchBill()
    },[id])

    useEffect(() => {
        fetchVehicle()
        fetchToken()
    }, [bill])


  return (
    <div className=' px-[10%] py-20 flex items-center'>
        <div className='grid grid-cols-2 items-center gap-10'>
            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-medium'>Bill Information</h1>
                <ul className='text-xl'>
                    <li>Bill id : {bill._id}</li>
                    <li>Token id: {bill.token}</li>
                    <li>Total cost : ₹{bill.totalCost}</li>
                    <li>Vehicle id : {bill.vehicle}</li>
                    <li className='mt-2'>
                        Payment Status: {' '}
                        <span className={`font-semibold ${bill.ispaid ? 'text-green-600' : 'text-red-600'}`}>
                            {bill.ispaid ? '✓ PAID' : '✗ UNPAID'}
                        </span>
                    </li>
                </ul>
                {!bill.ispaid && (
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className={`${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2`}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Pay Now
                            </>
                        )}
                    </button>
                )}
            </div>

            <div>
                <img className='w-[400px] h-[350px]' src="https://cdn-icons-png.flaticon.com/512/9409/9409684.png" alt="" />
            </div>
            <div>
                <img className='w-[500px] h-[350px]' src="https://as2.ftcdn.net/jpg/01/82/21/75/1000_F_182217564_SjrGAel4jpR7ibL469csR0mC9OZHXFkp.jpg" alt="" />
            </div>

            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-medium'>Vehicle Information</h1>
                <ul className='text-xl'>
                    <li>Vehicle id : {vehicle._id}</li>
                    <li>Lastly Parked At: {vehicle.parkedAt}</li>
                    <li>Vehicle model : {vehicle.vmodel}</li>
                    <li>Vehicle Number : {vehicle.vno}</li>
                </ul>
            </div>

            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-medium'>Token Information</h1>
                <ul className='text-xl'>
                    <li>Token id : {token._id}</li>
                    <li>Parked At: {token.parkedAt}</li>
                    <li>Vehicle id : {token.vehicle}</li>
                </ul>
            </div>

            <div>
                <img className='w-[500px] h-[350px]' src="https://i.ebayimg.com/images/g/II4AAOSwYzRlQ4oV/s-l1200.jpg" alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default SingleBill