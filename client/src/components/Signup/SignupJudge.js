import React from 'react'
import '../../assets/css/signup.css';
import signupimg from '../../assets/media/signup.png';

const SignupJudge = () => {
  return (
    <div className='signup'>
        <div className='signup-left'>
            <div className='signup-head'>
                <h1>E-Adaalat Management</h1>
                <h1>System </h1>
                <p>“A State Of The Art e-Court Solution”</p>
            </div>
            <img src={signupimg} width="400px"></img>
        </div>
        <div className='signup-right'>
            <div className='signup-box'>
                <div className='signup-content'>
                    <h1>Signup as Judge</h1>
                    <div className='form'>
                        <input className='forminput' type="text" name="name" placeholder='Name'></input>
                        <input className='forminput' type="text" name="email" placeholder='Email'></input>
                        <input className='forminput' type="password" name="password" placeholder='Password'></input>
                    </div>
                    <button className='signupbtn'>
                        Login
                    </button>
                    <p>Already have an account? <a className='signup-a'>Login</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupJudge