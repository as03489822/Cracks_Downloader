'use client'
import { useParams } from 'next/navigation';
import Footer from "@/component/Footer";
import Header from "@/component/Header"
import data from "@/data/cracksSoftwares"
import Image from "next/image";

const SoftwareDetail = () => {
  const Categories = ["Downloader" ,"File Extractor", "PC" , "Utility" , "Uninstaller" ]
  const {id} = useParams();
  const software = data?.find((el=>el.id == id));

  return (
    <div className="flex flex-col items-center bg-[#181D14] text-white  ">
      <Header />
      <div className="flex gap-6 w-[1200px] py-5 ">
        {/* software detatil  */}
        <div className=' p-5 w-[65%] bg-[#232e24] rounded'>
          <div>
            <h1 className='text-[24px] font-bold'>{software.title}</h1>
            <p className='text-[12px] text-[#a0a0a0]'>{software.author}  &gt; {software.category}  &gt; {software.title}</p>
            <p className='text-[12px] pt-5 pb-2 text-[#a0a0a0]'> {software.author}  <span className=' bg-[#a0a0a0] mx-2 pl-[1px]'></span> {software.date} <span className=' bg-[#a0a0a0] mx-2 pl-[1px]'></span> {software.comments} Comments</p>
            <hr className='text-[#a0a0a0]'/>
            <p  className='flex justify-between text-[14px] py-2 text-[#a0a0a0]'>
              <span >{software.category}</span>
              <span>
                {
                  software?.tags?.map(
                    tag => <span key={tag}>{tag}</span>
                  )
                }
              </span>
            </p>
              <hr className='text-[#a0a0a0]' />

            <h2 className='text-[20px] py-5 font-semibold'>{software.details.description}</h2>
            <p className='text-[14px] text-justify '>{software.details.overview}</p>
            <p className='text-[14px] text-justify pt-5'>{software.fullDescription}</p>

            <h3 className='font-semibold text-[18px] pt-8' >Whats new in version {software.details.what_is_new.version}</h3>
            <h3 className='font-semibold text-[18px]' >(Released : {software.details.what_is_new.release_date})</h3>
            <li className='text-[14px]'>{software.details.what_is_new.changes}</li>

            <h3 className='font-semibold text-[18px] pt-8'>System Requirements of IDM:</h3>
            <p className='text-[14px]'><b>Operating System: </b>{software.details.system_requirements.os}</p>
            <p className='text-[14px]'><b>Memory (RAM): </b>{software.details.system_requirements.memory}</p>
            <p className='text-[14px]'><b>Hard Disk Space: </b>{software.details.system_requirements.storage}</p>

            <h3 className='font-semibold text-[18px] pt-8'>How to Install and Crack:</h3>
            <ul className='text-[14px] pl-3 py-1 list-decimal ml-3'>
              {
                software?.details?.installation_steps?.map(
                  ( step , index) => <li key={index}>{step}</li>
                )
              }
            </ul>

            <h2 className='text-[20px] text-blue-500 underline pt-8'>{software.details.download.link_text}</h2>
            <h3 className='text-[19px] text-red-500 '>Password = {software.details.download.password}</h3>
              
              {/* comment form */}
            <form className="w-[70%] text-[14px] my-8 flex flex-col gap-3 items-start" >
              <h4 className='text-[20px] font-bold'>Leave a Comment</h4>
              <p>Your email address will not be published. Required fields are marked *</p>
              <textarea className=' bg-[#181D14] w-full outline-none p-2 rounded' placeholder='Comment ... '  rows={6}></textarea>
              <input placeholder='Your name *' type='text' className=' w-full bg-[#181D14] outline-none px-2 py-1 rounded' />
              <input placeholder='E-mail *' type='email' className=' w-full bg-[#181D14] outline-none px-2 py-1 rounded' />
              <input placeholder='Website *' type='url' className=' w-full bg-[#181D14] outline-none px-2 py-1 rounded' />
              <label className="flex items-center gap-2 text-white">
                <input type="checkbox" className="accent-green-500" />
                Save my name, email, and website in this browser for the next time I comment
              </label>
              <button className='bg-blue-400 rounded py-2 px-5'>Post Comment</button>
            </form> 
          </div>
        </div>

        {/* recently cracks */}
        <div className="w-[35%] bg-[#232e24] h-full rounded-md p-5">
          <h1 className="text-xl font-bold">Recently Cracks</h1>
        {data?.map((item) => (
        <div key={item.id} className="px-4  rounded  mt-5 flex">
          <Image src={item.image} alt={item.title} width={80} height={80} />
          <div>
          <h2 className="text-md font-bold mt-2 ">{item.title}</h2>
          <p className="text-[13px] text-[#a0a0a0]">{item.date} • {item.comments} comments</p>
          </div>
          {/* <p className="mt-2">{item.shortDescription}</p> */}
        </div>
        ))}

        {/* Category */}
        <h1 className="text-xl pt-4 font-bold">Categories</h1>
        <ul className="py-3 list-disc px-7 ">
          {
            Categories?.map((item , index)=>
            <li className="text-[#a0a0a0] cursor-pointer hover:text-white hover:underline" key={index} >{item}</li>
            )
          }
        </ul>
        </div>
      </div>
      <Footer />  
    </div>
  )
}

export default SoftwareDetail