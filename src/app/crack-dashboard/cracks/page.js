'use client'
import LeftSidebar from '@/component/LeftSidebar'
import { FaEdit , FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const Cracks = () => {
  const router = useRouter();
  const [cracks , setCracks] = useState(null);
    const { user, loading } = useAuth();
  
    useEffect(() => {
      const fetchCracks = async () => {
        try {
          const res = await fetch('/api/crack');
          if(res.ok){
            const data = await res.json();
          console.log(data)
          setCracks(data);
          }
        } catch (err) {
          console.error('Error fetching cracks:', err);
        }
      };
      fetchCracks();
      if (!loading && !user) {
        router.push("/dashboard-login");
      }
    }, [loading, user, router]);
  


  const handleClick = (id) =>{
    router.push(`/crack-dashboard/add-crack/${id}`)
  }
  
const deleteClick = async (id) => {
  try {
    const res = await fetch(`/api/crack/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to delete crack");
      return;
    }

    setCracks((prev) => prev.filter((crack) => crack._id !== id));

    toast.success(data.message || "Crack deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while deleting crack");
  }
};

  
    if (loading) return ;
  return (
    <div className='flex h-screen text-white'>
      <LeftSidebar className="w-64" />
      <div className='w-full bg-[#181D14]'>
        <p className='p-10 text-bold text-4xl'>Cracks</p>
         <div className="overflow-x-auto p-10">
          <table className="min-w-full bg-[#181D14] text-white border border-gray-600">
            <thead className='border border-black'>
              <tr className="bg-[#242e24]">
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Tags</th>
                <th className="px-4 py-2 border">Version</th>
                <th className="px-4 py-2 border">Release Date</th>
                <th className="px-4 py-2 border"> update/delete</th>
              </tr>
            </thead>
            <tbody>
              {cracks?( 
              cracks.map((crack , index) => (
                <tr key={index} className="hover:bg-[#1f2a1f] transition">
                  <td className="px-4 py-2 border">{index+1}</td>
                  <td className="px-4 py-2 border">{crack.title}</td>
                  <td className="px-4 py-2 border">{crack.date}</td>
                  <td className="px-4 py-2 border">{crack.author}</td>
                  <td className="px-4 py-2 border">{crack.category}</td>
                  <td className="px-4 py-2 border">{crack.tags?.join(', ')}</td>
                  <td className="px-4 py-2 border">{crack.details?.what_is_new?.version}</td>
                  <td className="px-4 py-2 border">{crack.details?.what_is_new?.release_date}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center h-full items-center gap-2">
                      <FaEdit className='cursor-pointer' onClick={()=> handleClick(crack._id)} />
                      <FaTrash className='cursor-pointer' onClick={()=> deleteClick(crack._id)} />
                    </div>
                  </td>
                </tr>
                ))
              ):(
                 <tr>
                    <td colSpan="9" className="text-center py-4 border font-semibold">
                      Loading...
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Cracks