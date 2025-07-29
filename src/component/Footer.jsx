import React from 'react'
import logo from '../../public/crack_Logo.png'
import Image from 'next/image'
const Footer = () => {
  return (
        <div className='bg-white w-full flex flex-col items-center justify-center '>
          <div className='flex justify-between items-start w-[1200px] h-[250px] py-16'>
            
            <div className='flex items-center h-full'>
                <Image  src={logo} alt='crackLogo' className='w-[60px] h-[100px] object-cover'/>
                <p className='flex flex-col justify-center'>
                    <span className='font-bold text-2xl leading-[1] text-[#4c4c4f]'>Cracke</span> 
                    <span className='text-[#749c94] font-semibold'>Downloader</span>    
                </p>
            </div>

            <div className=''>
              <h2 className='font-bold text-xl'>Pages</h2>
              <ul className='pt-2'>
                <li>Home</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div>
              <h2 className='font-bold text-xl' >Popular Posts</h2>
              <ul className='pt-2'>
                <li>popular post 1</li>
                <li>popular post 2</li>
                <li>popular post 3</li>
                <li>popular post 4</li>
              </ul>
            </div>
            
            <div>
              <h2 className='font-bold text-xl' >Contact Us</h2>
              <p className='pt-2'>dummy123@gmail.com</p>
            </div>

          </div>

          <p className='bg-[#749c94] py-4 w-full text-center'>All Rights Reserved © 2024 Copyright: Cracks Downloader</p>
        </div>
  )
}

export default Footer