import React from 'react'
import '../assets/css/navbar.css';

const Navbar = (props) => {

  const x= props.p? 'nav-main':'nav-b';

  return (
    <div>
        <div className={x}>
            <div className='nav-links'>
                <a href='/'>About</a>
                <a href='/login' >Cases</a>
                <a href='/login' >Courts</a>
                <a href='/login'>Login</a>
                <a href='/signup' className='signup-btn'>Signup</a>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar