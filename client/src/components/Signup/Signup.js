import React from 'react'
import '../../assets/css/signup.css';
import swal from "sweetalert"
import signupimg from '../../assets/media/signup.png';
import { useState } from 'react';
import { Redirect } from 'react-router'
import URL from '../../URL';
const Signup = () => {
    const [redirect,setRedirect] = useState(null);
    const [userEnteredData, setuserEnteredData] = useState({
        name: "",
        email: "",
        uid: "",
        password: "",
        location:"",
        type:"judge"
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
                        <a href="./signup" style={{color:"#C89A69", textDecoration: "underline"}}>Signup as Judge</a>
                        <a href='./signuplawyer'>Signup as Lawyer</a>
                    </div>
                    <form className='form' id ="judgeForm">
                        <input className='forminput' type="text" name="name" placeholder='Name' value = {userEnteredData.name} onChange = {handleInput}></input>
                        <input className='forminput' type="text" name="email" placeholder='Email'  value = {userEnteredData.email} onChange = {handleInput}></input>
                        <input className='forminput' type="password" name="password" placeholder='Password' value = {userEnteredData.password}  onChange = {handleInput}></input>
                        <input className='forminput' type="text" name="uid" placeholder='Unique Identification Number' value = {userEnteredData.uid}  onChange = {handleInput}></input>
                        <input className='forminput' type="text" name="location" placeholder='Court Name' value = {userEnteredData.location} onChange = {handleInput}></input>
                        <a onClick={submitHandler}>
                        <input className="signupbtn" form = "judgeForm" type="submit" value="Sign Up" />
                    </a>
                    </form>
                   
                    <p>Already have an account? <a className='signup-a'>Login</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup