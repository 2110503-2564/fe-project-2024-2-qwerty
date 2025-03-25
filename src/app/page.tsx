import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Card2 from "@/components/Card2";
export default function Home() {
  return (
    <main className={styles.main}>
      <Banner></Banner>
     {/* <h1 className="text-center item-center mt-[20px] text-3xl">Online Job Fair</h1>
      <h3 className="text-center">Oppotunity to find the job you dreamed of.</h3>

      <div className="text-center flex justify-center">
        <button className="w-[150px] mt-[10px] mr-[10px] flex items-center justify-center h-[50px] text-black text-xl font-bold border-4 border-black antialiased font-sans rounded-lg hover:bg-black hover:text-white hover:border-black-500 transition">
          Sign-In
        </button>
        <button className="w-[150px] mt-[10px] mr-[10px] flex items-center justify-center h-[50px] text-black text-xl font-bold border-4 border-black antialiased font-sans rounded-lg hover:bg-black hover:text-white hover:border-black transition">Register</button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Card2
        imageUrl="img/logo.png"
        title='-----------------text-----------------'
        buttonText="-----------------text-----------------"
      />
      <Card2
        imageUrl="img/logo.png"
        title='หางานที่ใช่ด้วย OLJF ตัวช่วยให้คุณสามารถหางานให้ได้ง่ายขึน'
        buttonText="หางานฟรี!"
      />
      </div>
      */}
      



    </main>
  );
}
