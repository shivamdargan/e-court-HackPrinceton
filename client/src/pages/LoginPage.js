import React from 'react'
import Footer from '../components/Footer'
import Login from '../components/Login/Login'
import Navbar from '../components/Navbar'

const LoginPage = () => {

  const x=0;

  return (
    <div>
        <Navbar p={x} />
        <Login/>
        <Footer/>
    </div>
  )
}

export default LoginPage