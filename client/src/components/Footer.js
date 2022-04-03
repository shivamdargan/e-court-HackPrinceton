import React from 'react'
import '../assets/css/footer.css';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-1'>
            <div className='quick-links'>
                <h1>Quick Links</h1>
                <a>Cases</a>
                <a>Courts</a>
                <a>Login</a>
                <a>Sign Up</a>
            </div>
            <div className='quick-links'>
                <h1></h1>
                <a>Terms and Conditions</a>
                <a>Privacy Policy</a>
                <a>Contact Us</a>
                <a>Helpdesk</a>
            </div>
            <div className='reach-us'>
                <h1>Reach Us</h1>
                <a>LinkedIn</a>
                <a>Twitter</a>
                <a>Instagram</a>
            </div>
        </div>
        <div className='footer-2'>
            <div className='copyright'>
                <p>© 2022, Gormint All Rights Reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer