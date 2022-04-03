import React from 'react'
import '../../assets/css/about.css';
import calendar from '../../assets/media/rafikicalendar.png';
import prioritise from '../../assets/media/rafikiprioritise.png';
import resume from '../../assets/media/resume.png';

const About = () => {
  return (
    <div className='about-section'>
        <div className='about-1'>
            <div className='about-heading'>
                <h1>About</h1>
            </div>
            <div className='about-para'>
                <p>At E-adalat management systems we strive to automate legal work by digitalizing case filing, tracking the number of cases and prioritizing them. Additionally, E-adalat offers a platform for legal judges and lawyers to manage documents that are otherwise a hassle to deal with. With an understanding of the difficulties faced by legal workers, we designed a system to provide a comfortable and personal experience. Students interested in law may also check the details of on-going or closed cases in the cases tab.</p>
            </div>
        </div>
        <div className='about-2'>
            <div className='about-features'>
                <img src={calendar}></img>
                <p>Automatic allotment and prioritisation of cases</p>
            </div>
            <div className='about-features'>
                <img src={prioritise}></img>
                <p>Management of all case files and documents</p>
            </div>
            <div className='about-features'>
                <img src={resume}></img>
                <p>Increased productive output with effective management</p>
            </div>
        </div>

    </div>
  )
}

export default About