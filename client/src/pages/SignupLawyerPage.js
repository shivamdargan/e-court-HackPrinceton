import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SignupLawyer from "../components/Signup/SignupLawyer"

const SignupLawyerPage = () => {
  return (
    <div>
        <Navbar/>
        <SignupLawyer/>
        <Footer/>
    </div>
  )
}

export default SignupLawyerPage