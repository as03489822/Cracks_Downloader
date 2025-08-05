"use client"
// import { useEffect } from 'react'
import LeftSidebar from '@/component/LeftSidebar'

const Dashboard = () => {
//   const nav = useNavigate();
//   useEffect(() =>{
//     const token = localStorage.getItem("token")

//     if(!token){
//       nav("/")
//     }})
  return (
    <div className='flex h-screen text-white'>
      <LeftSidebar className="w-64" />
      <div className='w-full bg-[#181D14]'>
        <p className='p-10 text-bold text-4xl'>Dashboard</p>
      </div>
    </div>
  )
}

export default Dashboard;


