import React from 'react'
import '../../assets/css/login.css';
import loginimg from '../../assets/media/login.png';
import { useState } from 'react';
import swal from 'sweetalert';
import { Redirect } from 'react-router'
import URL from '../../URL';
const Login = () => {

    const[redirect,setRedirect] = useState(null)
    const [userEnteredData, setuserEnteredData] = useState({
        uid: "",
        password: ""
      })
  
      const handleInput = (event) =>
      {
          const name = event.target.name;
          const value = event.target.value;
  
          setuserEnteredData({...userEnteredData, [name]:value })
  
      }
  
  
      const submitHandler = (event) =>
      {
          event.preventDefault()
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify(userEnteredData),  
              credentials: "include"
              };
              fetch(`${URL}/login/localUser`, requestOptions )
              .then(async response => {
                if(response.status === 400)
                {
                    swal({
                        title: "Failed!",
                        text: "Invalid Credentials, Please Try Again !",
                        icon: "error",
                      });
                      return;
                }
                  response.json().then(data =>  {
                    
                      if(response.ok){
                        
                          swal({
                            title: "Success!",
                            text: "User Signed In Successfully",
                            icon: "success",
                          });
                          setRedirect(<Redirect to="/dashboard"/>)
  
                       }
                      else{
                        swal({
                          title: "Failed!",
                          text: "Invalid Credentials, Please Try Again !",
                          icon: "error",
                        });
                          //throw response.json();
                      }
                    });
                  
                })
                .catch(async (error) => {
                  const errorMessage = await error;
                  console.log(errorMessage)
                  
                })
      }

      
  return (
    <div className='login'>
        {redirect}
        <div className='login-left'>
            <div className='login-head'>
                <h1>E-Adaalat Management</h1>
                <h1>System </h1>
                <p>“A State Of The Art e-Court Solution”</p>
            </div>
            <img src={loginimg} width="400px"></img>
        </div>
        <div className='login-right'>
            <div className='login-box'>
                <div className='login-content'>
                    <h1>Login</h1>
                    <form className='form' id="loginForm">
                        <input className='forminput' type="text" name="uid" placeholder='UID'  value = {userEnteredData.uid} onChange={handleInput}></input>
                        <input className='forminput' type="password" name="password" placeholder='Password'  value = {userEnteredData.password} onChange={handleInput}></input>
                        <a onClick={submitHandler}>
                        <input className="signupbtn" form = "loginForm" type="submit" value="Login" />
                        </a>
                    </form>
                  
                    <p>Don't have an account? <a className='signup-a' href='/signUp'>Sign Up</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login