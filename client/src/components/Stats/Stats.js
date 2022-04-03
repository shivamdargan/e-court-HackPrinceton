import React from 'react'
import '../../assets/css/stats.css';
import URL from "../../URL";
import { useState,useEffect } from 'react';
const Stats = () => {
  const [statsData,setStatsData] = useState();
  const [dailyCases,setDailyCases] = useState();
  const getStats = () => {
    fetch(`${URL}/stats/cases`,  {credentials: "include"})
    .then(async response => {
        if(response.ok){
            response.json().then(data => {
             
               setStatsData(data)
            });
         }
        else{
            throw response.json();
        }
      })
      .catch(async (error) => {
       
        const errorMessage = await error;
        console.log(errorMessage)
      })
}
const getFiledCases = () => {
  fetch(`${URL}/dailyFilled/cases`,  {credentials: "include"})
  .then(async response => {
      if(response.ok){
          response.json().then(data => {
             setDailyCases(data)
          });
       }
      else{
          throw response.json();
      }
    })
    .catch(async (error) => {
     
      const errorMessage = await error;
      console.log(errorMessage)
    })
}
useEffect(() =>{
  getStats();
  getFiledCases();
 }, [])
  return (
    <div className='stats-section'>
        <div className='stats-card'>
            <p className='stats-num'>{statsData !== undefined ? statsData.openCases : "Loading.."}</p>
            <p className='stats-name'>OPEN CASES</p>
        </div>
        <div className='stats-card'>
            <p className='stats-num'>{statsData !== undefined ? statsData.closedCases : "Loading.."}</p>
            <p className='stats-name'>CLOSED CASES</p>
        </div>
        <div className='stats-card'>
            <p className='stats-num'>{dailyCases !== undefined ? dailyCases.noOfCases : "Loading.."}</p>
            <p className='stats-name'>DAILY CASES LISTED </p>
        </div>
    </div>
  )
}

export default Stats