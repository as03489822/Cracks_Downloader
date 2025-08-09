'use client'
import LeftSidebar from '@/component/LeftSidebar'
import data from '@/data/cracksSoftwares.json'
import { FaEdit , FaTrash } from 'react-icons/fa'

import { useParams, useRouter } from 'next/navigation';

const Cracks = () => {
  const router = useRouter();

  const handleClick = (id) =>{
    router.push(`/crack-dashboard/add-crack/${id}`)
  }

  return (
    <div className='flex h-screen text-white'>
      <LeftSidebar className="w-64" />
      <div className='w-full bg-[#181D14]'>
        <p className='p-10 text-bold text-4xl'>Cracks</p>
         <div className="overflow-x-auto p-10">
          <table className="min-w-full bg-[#181D14] text-white border border-gray-600">
            <thead className='border border-black'>
              <tr className="bg-[#242e24]">
                <th className="px-4 py-2 border">ID</th>
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
              {data?.map((crack) => (
                <tr key={crack.id} className="hover:bg-[#1f2a1f] transition">
                  <td className="px-4 py-2 border">{crack.id}</td>
                  <td className="px-4 py-2 border">{crack.title}</td>
                  <td className="px-4 py-2 border">{crack.date}</td>
                  <td className="px-4 py-2 border">{crack.author}</td>
                  <td className="px-4 py-2 border">{crack.category}</td>
                  <td className="px-4 py-2 border">{crack.tags?.join(', ')}</td>
                  <td className="px-4 py-2 border">{crack.details?.what_is_new?.version}</td>
                  <td className="px-4 py-2 border">{crack.details?.what_is_new?.release_date}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center h-full items-center gap-2">
                      <FaEdit className='cursor-pointer' onClick={()=> handleClick(crack.id)} />
                      <FaTrash className='cursor-pointer' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Cracks