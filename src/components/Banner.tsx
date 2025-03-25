'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner () {
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg'];
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const {data: session} = useSession();

    return (
        <div className = {styles.banner} onClick={()=>setIndex((index+1)%covers.length)}>
            <div className="relative w-[100vw] h-screen bg-gray-900 flex justify-center items-center overflow-hidden" />
            <Image src = {covers[index]}
            alt = 'cover' 
            fill = {true} 
            objectFit = 'cover'
            priority
            />
         <div className="absolute top-0 right-0 w-[50vw] h-[49vw] bg-white rounded-l-full">
    {/* เนื้อหาภายในครึ่งวงกลม */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
	{session?<h1 className="text-black text-4xl font-bold mb-4">{session.user?.name}</h1>:null}
    <h1 className="text-black text-4xl font-bold mb-4">Hello</h1>
	  <div>
	  <button className="px-6 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Sign-in
      </button>
		
	  <button className="px-6 py-2 ml-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Sign-up
      </button>
	  </div>
    </div>
  </div>
            
        </div>
    );
}