import React from 'react'
import SideNav from '../components/Dashboard/SideNav'
import '../assets/css/dashboard.css';
import Dashboard from '../components/Dashboard/Dasboard';

const DashboardPage = () => {
  return (
    <div className='dashboard'>
        <SideNav></SideNav>
        <Dashboard/>
    </div>
  )
}

export default DashboardPage