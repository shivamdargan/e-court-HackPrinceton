import React from 'react'
import '../../assets/css/landing.css';

const LandingContent = () => {
  return (
      <div className='landing-main'>
        <div className='landing-content'>
            <h1>E-Adaalat Management</h1>
            <h1>System</h1>
            <div className='p-info'>
                <p>“A State Of The Art e-Court Solution”</p>
            </div>
            <div className='getstarted'>
                <a className='getstarted-btn' href = "/login" style={{cursor:"pointer",textDecoration:"none"}}>
                    Get Started
                </a>
            </div>
        </div>
      </div>
  )
}

export default LandingContent