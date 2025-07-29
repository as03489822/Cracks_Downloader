import Footer from "@/component/Footer";
import Header from "@/component/Header"
import data from "@/data/cracksSoftwares"
import Image from "next/image";

export default function Home() {
  const Categories = ["Downloader" ,"File Extractor", "PC" , "Utility" , "Uninstaller" ]
  return (
    <div className="flex flex-col items-center bg-[#749c94]  ">
      <Header />
      <div className="flex gap-6   w-[1200px] py-5">
        {/* all cracks */}
        <div className="grid gap-6 w-[60%]">
          <h1 className="text-3xl font-bold">All Cracks</h1>
        {data?.map((item) => (
        <div key={item.id} className="p-4  rounded cursor-pointer bg-white">
          <Image src={item.image} alt={item.title} width={80} height={80} />
          <h2 className="text-xl font-bold mt-2 text-[#4c4c4f]">{item.title}</h2>
          <p className="text-sm text-[#4c4c4f]">{item.date} • {item.comments} comments</p>
          <p className="mt-2  text-[#4c4c4f]">{item.shortDescription}</p>
        </div>
        ))}
        </div>

        <div className="w-[40%] bg-white h-full mt-[60px] rounded-md p-5">
        {/* recently cracks */}
          <h1 className="text-xl font-bold">Recently Cracks</h1>
        {data?.map((item) => (
        <div key={item.id} className="px-4  rounded  mt-5 flex">
          <Image src={item.image} alt={item.title} width={80} height={80} />
          <div>
          <h2 className="text-md font-bold mt-2 text-[#4c4c4f]">{item.title}</h2>
          <p className="text-[13px] text-[#4c4c4f]">{item.date} • {item.comments} comments</p>
          </div>
          {/* <p className="mt-2">{item.shortDescription}</p> */}
        </div>
        ))}

        {/* Category */}
        <h1 className="text-xl pt-4 font-bold">Categories</h1>
        <ul className="py-3 list-disc px-7 ">
          {
            Categories?.map((item , index)=>
            <li className="text-[#4c4c4f] cursor-pointer hover:text-black hover:underline" key={index} >{item}</li>
            )
          }
        </ul>
        </div>
      </div>
      <Footer />  
    </div>
  );
}
