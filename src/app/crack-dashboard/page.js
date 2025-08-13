"use client"
// import { useEffect } from 'react'
import LeftSidebar from '@/component/LeftSidebar'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
//   const nav = useNavigate();
//   useEffect(() =>{
//     const token = localStorage.getItem("token")

//     if(!token){
//       nav("/")
//     }})
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dashboard-login");
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
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


