'use client'
import LeftSidebar from '@/component/LeftSidebar'
import data from '@/data/cracksSoftwares.json+ '

const Cracks = () => {
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