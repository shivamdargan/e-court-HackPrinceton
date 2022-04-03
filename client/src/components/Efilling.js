import React from 'react'
import '../assets/css/form.css';
import URL from '../URL';
import { useState } from 'react';
import swal from 'sweetalert';
import { Redirect } from 'react-router'

const Efilling = () => {

    const [redirect,setRedirect] = useState(null);
    const [userEnteredData, setuserEnteredData] = useState({
        title: "",
        nameAccused: "",
        gender: "",
        age: "",
        details:"",
        clause:"",
        phone:"",
        location:"",
        dangerousCriminal:"",
    })
    const [imageState, setimageState] = useState()

    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }

    const fileHandler = (event) =>
    {
 
      const file = event.target.files;
      setimageState(file)
    }

    let data = new FormData()

    data.append('title',userEnteredData.title)
    data.append('nameAccused',userEnteredData.nameAccused)
    data.append('gender',userEnteredData.gender)
    data.append('age',userEnteredData.age)
    data.append('details',userEnteredData.details)
    data.append('clause',userEnteredData.clause)
    data.append('phone',userEnteredData.phone)
    data.append('location',userEnteredData.location)
    data.append('dangerousCriminal',userEnteredData.dangerousCriminal)
    if(imageState !== undefined)
    {
        for(var x = 0; x<imageState.length; x++) {
          data.append('caseImage', imageState[x])
        }
    }


    const selectDegreeHandler = (e) => {
        setuserEnteredData((prev) => {
          return {
            ...prev,
            dangerousCriminal : e.target.value,
          };
        });
      };
      const selectGenderHandler = (e) => {
        setuserEnteredData((prev) => {
          return {
            ...prev,
            gender : e.target.value,
          };
        });
      };

    const submitHandler = (event) =>
    {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            body:data,  
            credentials: "include"
            };
            fetch(`${URL}/new/case`, requestOptions )
            .then(async response => {
    
             
                if(response.ok){
             
                    swal({
                      title: "Success!",
                      text: "Case Raised Successfully",
                      icon: "success",
                    })
                    
                    setRedirect(<Redirect to="/dashboard"/>)
                    
                 }
                 else if(response.status === 401){
                  swal({
                    title: "Unauthorised!",
                    text: "Please Login",
                    icon: "error",
                  });
                 }
                else{
                    throw response.json();
                }
              })
              .catch(async (error) => {
                const errorMessage = await error;
       
                if( errorMessage.error !== undefined)
                {
                  if(!(typeof errorMessage.error.code === 'string') && !(errorMessage.error.code instanceof String))  
                  {
                    swal({
                      title: "Error!",
                      text: "Unknown Error Has Occured !",
                      icon: "error",
                    });
                  }
                  else
                  {
                    if((errorMessage.error.code.localeCompare("LIMIT_FILE_SIZE") === 0) ||(errorMessage.error.code.localeCompare("LIMIT_UNEXPECTED_FILE") === 0) )
                    {
                      swal({
                        title: "Error!",
                        text: "Maximumm Number Of 3 Images Can Be Uploaded",
                        icon: "error",
                      });
                    }
                  }
                }
               
              }) 
    
    }



  return (
    <div className='efiling'>
        {redirect}
        <div className='e-form'>
            <h1>e-Filing</h1>
            <div className='form'>
                <input className='forminput' type="text" name="title" placeholder='Enter Title' value={userEnteredData.title} onChange = {handleInput}></input>
                <input className='forminput desc' type="text" name="details" placeholder='Description' value={userEnteredData.details} onChange = {handleInput} ></input>
                <input className='forminput' type="text" name="clause" placeholder='Enter Clause(IPC Section)' value={userEnteredData.clause} onChange = {handleInput}></input>
                <input className='forminput' type="text" name="location" placeholder='Location Of Incident'value={userEnteredData.location} onChange = {handleInput} ></input>
                <label class="form-label mt-4">Upload Upto 3 Images</label>  
                <form encType="multipart/form-data" name="caseImage">
                  <input
                    type="file"
                    id="uploads"
                    name="caseImage"
                    accept=".jpg, .jpeg, .png, .svg, .gif"
                    onChange={fileHandler}
                    multiple
                  />
                </form>
                

                <div className='degreeResponse'>
                <p>Degree of Responsibility</p>
                <form onChange={(e) => selectDegreeHandler(e)}>
                <input className='radio' type="radio" name="dangerousCriminal" value="1" />1
                <input className='radio' type="radio" name="dangerousCriminal" value="2" />2
                <input className='radio' type="radio" name="dangerousCriminal" value="3" />3
                <input className='radio' type="radio" name="dangerousCriminal" value="4" />4
                <input className='radio' type="radio" name="dangerousCriminal" value="5" />5
                </form>
                </div>
                <div className='accused'>
                <p>Details of Accused</p>
                </div>
                <input className='forminput' type="text" name="nameAccused" placeholder='Name Of The Accussed'value={userEnteredData.nameAccused} onChange = {handleInput}></input>
                <input className='forminput' type="text" name="phone" placeholder='Phone No.' value={userEnteredData.phone} onChange = {handleInput}></input>
                <select className='gender' name="gender" id="gender" onChange={(e) => selectGenderHandler(e)}>
                    <option value="Gender">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                <input className='forminput' type="text" name="age" placeholder='Age' value={userEnteredData.age    } onChange = {handleInput}></input>
            </div>
            <button onClick={submitHandler} className='submitbtn'>
                Submit
            </button>
        </div>
    </div>
  )
}

export default Efilling