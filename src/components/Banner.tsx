'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner () {
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg','/img/cover5.jpg'];
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const {data: session} = useSession();

    return (
        <div className = {styles.banner} onClick={()=>setIndex((index+1)%covers.length)}>
            <div className="relative w-[100vw] h-screen bg-gray-900 flex justify-center items-center overflow-hidden" />
            <Image src = {'/img/cover5.jpg'}
            alt = 'cover' 
            fill = {true} 
            objectFit = 'cover'
            priority
            />
         <div className="absolute top-0 right-0 w-[50vw] h-[49vw] bg-blue-400 rounded-l-full">
    {/* เนื้อหาภายในครึ่งวงกลม */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
	
	
	{session?<h1 className="text-black text-4xl font-bold mb-4">{session.user?.name}</h1>:null}
    <h1 className="text-white text-4xl font-bold mb-4 justify-center ">Online Job Fair</h1>
	  <h1 className="text-white text-lg font-bold  justify-center">Meet numerous leading companies and diverse job opportunities with the chance for </h1>
	  <h1 className="text-white text-lg font-bold mb-4 justify-center">immediate online interviews at our Online Job Fair</h1>
	  <div>
	  
	  <button className="px-7 py-3  bg-blue-400 border border-white text-white text-2xl font-bold rounded-3xl hover:bg-blue-600 transition">
       Get Start
      </button>
		
	  
	  </div>
    </div>
  </div>
            
        </div>
    );
}