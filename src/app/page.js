'use client'
import Footer from "@/component/Footer";
import Header from "@/component/Header"
import data from "@/data/cracksSoftwares"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const Categories = ["Downloader" ,"File Extractor", "PC" , "Utility" , "Uninstaller" ]
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center bg-[#181D14] text-white  ">
      <Header />
      <div className="flex gap-6   w-[1200px] py-5">
        {/* all cracks */}
        <div className="grid gap-6 w-[60%]">
          <h1 className="text-3xl font-bold">All Cracks</h1>
        {data?.map((item) => (
        <div key={item.id} className="p-4   h-[250px] rounded bg-[#232e24]" >
          <h2 className="text-xl font-bold mt-2  ">{item.title}</h2>
          <p className="text-sm  text-[#a0a0a0] py-2">{item.date} • {item.comments} comments</p>
          <div >
            <div className="flex gap-5 py-4">              
            <Image src={item.image} alt={item.title} width={80} height={80} />
            <p className="mt-2  text-[#a0a0a0] ">{item.shortDescription} </p>
            </div>
            <div className="flex justify-end">
              <button className="px-5 py-2 rounded bg-[#181D14] cursor-pointer" onClick={()=> router.push(`/software/${item.id}`)}>Read More</button>
            </div>
          </div>
        </div>
        ))}
        </div>

        {/* recently cracks */}
        <div className="w-[35%] bg-[#232e24] h-full mt-[60px] rounded-md p-5">
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
  );
}
