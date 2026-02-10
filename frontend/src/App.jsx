import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './hooks/Protected.jsx'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'
import BillPage from "./pages/BillPage.jsx"
import TokenPage from "./pages/TokenPage.jsx"
import Footer from './components/Footer.jsx'
import SingleBill from './pages/SingleBill.jsx'
import SingleToken from './pages/singleToken.jsx'
import { ToastContainer } from 'react-toastify'
import AdminTokens from './pages/AdminTokens.jsx'
import AdminBills from './pages/AdminBills.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentCancel from './pages/PaymentCancel.jsx'
import AdminVehicles from './pages/AdminVehicles.jsx'


function App() {
  

  return (
    <>
    <ToastContainer />
      {
      <Navbar/>
      }
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/register' Component={Register}/>
          <Route path='/dashboard' element={
            <Protected>
              <Dashboard/>
            </Protected>
          }/>
          <Route path='/profile' element={
            <Protected>
              <Profile/>
            </Protected>
          }/>
          <Route path='/bill' element={
            <Protected>
              <BillPage/>
            </Protected>
          }/>
          <Route path='/bill/:id' element={
            <Protected>
              <SingleBill/>
            </Protected>
          }/>
          <Route path='/token' element={
            <Protected>
              <TokenPage/>
            </Protected>
          }/>
          <Route path='/token/:id' element={
            <Protected>
              <SingleToken/>
            </Protected>
          }/>
          <Route path='/adminToken' element={
            <Protected>
              <AdminTokens/>
            </Protected>
          }/>
          <Route path='/adminBills' element={
            <Protected>
              <AdminBills/>
            </Protected>
          }/>
          <Route path='/payment-success' element={
            <Protected>
              <PaymentSuccess/>
            </Protected>
          }/>
          <Route path='/payment-cancel' element={
            <Protected>
              <PaymentCancel/>
            </Protected>
          }/>

          <Route path='/vehicles' element={
            <Protected>
              <AdminVehicles/>
            </Protected>
          }/>

      </Routes>
      <Footer/>

    </>
  )
}

export default App
