"use client"
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ContactUsPage = () => {

    const [contact , setContact] = useState({
    email:'',
    subject:'',
    text:''
  })

  const [loading , setLoading] = useState(false);
  
  const handleChange = (event) => {
    const {name , value} = event.target;
    setContact((preValue)=> {
      return { ...preValue , [name]:value}
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`/api/contact` , {
        method: 'POST',
        body: JSON.stringify(contact)
      })
      const data = await response.json();
      if(!response.ok){
        toast.error(data.error);
        return
      }
      toast.success(data.message);
      setContact({
        email:'',
        subject:'',
        text:''
      })
    } catch (error) {
      console.log(error)
      toast.error('servern error')
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center bg-[#181D14] text-white  ">
      <Header />
      <div className=' w-[1200px] flex flex-col justify-center items-center '>
        <form onSubmit={handleSubmit} className='bg-[#232e24] w-[50%] rounded p-5 flex flex-col gap-5'>
                  
        <h1 className="text-3xl font-bold">Contact Us</h1>
        {/* email */}
        <div className=''>
          <label  >Email</label>
          <input name='email' onChange={handleChange} value={contact.email} className='bg-[#181D14] w-full outline-none p-2 rounded mt-2' placeholder='Enter Email' type='email' />
        </div>
        {/* subject */}
        <div>
          <label>Subject</label>
          <input name='subject' onChange={handleChange} value={contact.subject} className='bg-[#181D14] w-full outline-none p-2 rounded mt-2' placeholder='Enter Email Subject' type='text' />
        </div>
        {/* Message */}
        <div>
          <label>Text</label>
          <textarea name='text' onChange={handleChange} value={contact.text} rows={7} className='bg-[#181D14] w-full outline-none p-2 rounded mt-2' placeholder='Enter Text ...' />
        </div>
        <div>
          {loading?<p className='bg-green-700 rounded py-2 px-5 cursor-crosshair'>Sending ...</p>:<button type='submit' className='bg-green-700 rounded py-2 px-5'>Send</button>}
        </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ContactUsPage