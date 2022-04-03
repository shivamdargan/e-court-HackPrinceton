import React from 'react'
import new_cases from '../../assets/media/new_cases.png';
import '../../assets/css/dashboard.css';

const Newcases = () => {
  return (
    <div className='newcases'>
      <div className='newcases-head'>
          <h1>New Cases</h1>
      </div>
        <div  className='newcases-box'>
            {/* <div className='newcases-index'>
              <p>Title</p>
              <p className='index-date'>Date of Filling</p>
            </div> */}
            <div className='newcases-card'>
              <p>THE STATE OF PUNJAB VS GOVIND SINGH</p>
              <p className='dates'>4 FEB, 2022</p>
              <img src={new_cases} width="20px" height="20px"></img>
            </div>
            <div className='newcases-card'>
              <p>THE STATE OF PUNJAB VS GOVIND SINGH</p>
              <p className='dates'>4 FEB, 2022</p>
              <img src={new_cases} width="20px" height="20px"></img>
            </div>
            <div className='newcases-card'>
              <p>THE STATE OF PUNJAB VS GOVIND SINGH</p>
              <p className='dates'>4 FEB, 2022</p>
              <img src={new_cases} width="20px" height="20px"></img>
            </div>
        </div>
    </div>
  )
}

export default Newcases