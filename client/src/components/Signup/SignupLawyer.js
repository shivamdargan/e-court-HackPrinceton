import React from 'react'
import '../../assets/css/signup.css';
import { useState } from 'react';
import swal from 'sweetalert';
import { Redirect } from 'react-router'
import signupimg from '../../assets/media/signup.png';
import URL from '../../URL';
const SignupLawyer = () => {

    const [redirect,setRedirect] = useState(null);
    const [userEnteredData, setuserEnteredData] = useState({
        name: "",
        email: "",
        uid: "",
        password: "",
        location:"",
        type:"lawyer"
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
            fetch(`${URL}/register`, requestOptions )
            .then(async response => {
                response.json().then(data =>  {
                    
                    if(response.ok){
                      
                        swal({
                          title: "Success!",
                          text: "User Created Successfully",
                          icon: "success",
                        });
                        setRedirect(<Redirect to="/login"/>)

                     }
                    else{
                      swal({
                        title: "Failed!",
                        text: data._message === undefined ? "Already registered With Email Address":data._message,
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
    <div className='signup'>
        {redirect}
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
                    <div className='signuplinks'>
                        <a href='./signup'>Signup as Judge</a>
                        <a href='/signuplawyer' style={{color:"#C89A69", textDecoration: "underline"}}>Signup as Lawyer</a>
                    </div>
                    <form className='form' id="lawyerForm">
                        <input className='forminput' type="text" name="name" placeholder='Name' value = {userEnteredData.name} onChange = {handleInput}></input>
                        <input className='forminput' type="text" name="email" placeholder='Email' value = {userEnteredData.email} onChange = {handleInput}></input>
                        <input className='forminput' type="password" name="password" placeholder='Password' value = {userEnteredData.password} onChange = {handleInput}></input>
                        <input className='forminput' type="text" name="uid" placeholder='UID' value = {userEnteredData.uid} onChange = {handleInput}></input>
                        <input className='forminput' type="text" name="location" placeholder='Location Based' value = {userEnteredData.location} onChange = {handleInput}></input>
                        <a onClick={submitHandler}>
                        <input className="signupbtn" form = "lawyerForm" type="submit" value="Sign Up" />
                        </a>
                    </form>
                   
                    <p>Already have an account? <a style={{textDecoration:"none"}}className='signup-a' href="/login">Login</a></p>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default SignupLawyer