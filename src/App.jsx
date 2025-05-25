import React, { useEffect } from 'react'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function App() {

  useEffect(() => {
    
  },[])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}