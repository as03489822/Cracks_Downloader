"use client"
import logo from '../../public/crack_Logo.png'
import Image from 'next/image'
import { FaSearch } from "react-icons/fa"
import data from "@/data/cracksSoftwares"
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter();
    const navList = [{page:'Home' , path: '/'},{page:'Contact Us' , path: '/contact-us'},]
  return (
    <div className='bg-[#181D14] w-full flex flex-col items-center  justify-center text-white '>
        <div className='bg-[#232e24]  w-full overflow-hidden'>
            <ul className=' flex gap-10 list-disc py-2 animate-marquee'>
            {
                data?.map((item , index)=>
                <li className='ml-5' key={index}>{item.title}</li>
                )
            }
        </ul>
        </div>
        <div className='flex justify-between items-center w-[1200px] h-[150px] '>
            {/* logo */}
        <div className='flex items-center'>
            <Image  src={logo} alt='crackLogo' className='w-[60px] h-[100px] object-cover'/>
            <p className='flex flex-col justify-center'>
                <span className='font-bold text-2xl leading-[1] '>Cracke</span> 
                <span className=' font-semibold'>Downloader</span>    
            </p>
        </div>
        {/* buttons */}
        <nav className='flex gap-5 '>
            {
                navList?.map((element , index) =>
                <li className='list-none font-semibold cursor-pointer' onClick={()=> router.push(element.path)} key={index}>
                    {element.page}
                </li>
                )
            }
        </nav>
        {/* search */}
        <div className="flex items-center border-[1px] rounded  border-[#adadad] border-r-0 h-[30px] w-[220px] ">
        <input
            type="text"
            placeholder="Search..."
            className="outline-none pl-3 py-3 w-full  h-full placeholder-white"
        />
        <span className="bg-[#749c94] border border-[#749c94] rounded-r flex justify-center items-center h-[30px] w-[40px]">
            <FaSearch className="text-white" />
        </span>
        </div>
    </div>
    </div>
  )
}

export default Header