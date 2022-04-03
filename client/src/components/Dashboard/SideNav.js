import React, { useState } from 'react'
import '../../assets/css/dashboard.css';
import logo from '../../assets/media/logo.png';
import dashboard from '../../assets/media/dashboard.png';
import cases from '../../assets/media/cases.png';
import calendar from '../../assets/media/calendar.png';
import tracker from '../../assets/media/tracker.png';
import courts from '../../assets/media/courts.png';
import profile from '../../assets/media/profile.png';
import logout from '../../assets/media/logout.png';
import swal from 'sweetalert';
import URL from '../../URL';
import { Redirect } from 'react-router';

const SideNav = () => {

    const [redirect,setRedirect] = useState(null);
    const logoutHandler = (event) =>
    {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
            };
            fetch(`${URL}/users/logout`, requestOptions )
            .then(async response => {
                setRedirect(<Redirect to="/"/>)
                response.json().then(data =>  {
                    
                    if(response.ok){
                        setRedirect(<Redirect to="/"/>)
                        swal({
                          title: "Success!",
                          text: "User Successfully Logged Out",
                          icon: "success",
                        });
                       

                     }
                    else{
                        setRedirect(<Redirect to="/"/>)
                      swal({
                        title: "Failed!",
                        text: data._message === undefined ? " Unknown Error Occured !": "Error Occurred !",
                        icon: "error"
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


    const btnStyle = {
        color: "#E1C7AA"
    }

  return (
    <div className='sidenav'>
        {redirect}
        <div className='logosection'>
            <img src={logo}></img>
        </div>
        <div className='linkssection'>
            <div className='link'>
                <a href='/dashboard'>
                    <img src={dashboard} width="20px" height="20px"></img>
                    <a style={btnStyle}>Dashboard</a>
                </a>
            </div>
            <div className='link'>
                <a href='/cases'>
                    <img src={cases} width="20px" height="20px"></img>
                    <a>Cases</a>
                </a>
            </div>
            <div className='link'>
                <img src={calendar} width="20px" height="20px"></img>
                <a>Calendar</a>
            </div>
            <div className='link'>
                <img src={tracker} width="20px" height="20px"></img>
                <a>Tracker</a>
            </div>
            <div className='link'>
                <img src={courts} width="20px" height="20px"></img>
                <a>Courts</a>
            </div>
            <div className='link'>
                <img src={profile} width="20px" height="20px"></img>
                <a>Profile</a>
            </div>
            <div onClick={logoutHandler} className='link logout'>
                <img src={logout} width="20px" height="20px"></img>
                <a >Logout</a>
            </div>
        </div>
    </div>
  )
}

export default SideNav