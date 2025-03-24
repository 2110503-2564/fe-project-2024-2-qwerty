import Image from "next/image";
import styles from "./page.module.css";
import CardP from "@/components/CardP";

export default function Profile() {
  return (
    <main className={styles.main}>
       
      <div className="flex flex-col items-center w-full justify-center">
        <div className="flex flex-col items-center w-full  mt-[50px] mb-[50px] w-3/6">
          <div className="flex flex-col items-center shadow-2xl shadow-black-200">
            <CardP
              imageUrl="img/logo.png" // เปลี่ยนเป็น path ของรูปภาพโปรไฟล์
              name="AAAAAAAAAAAAAAA"
              bio="Front-end dev"
            />
          </div>
        </div>
      </div>
      
    </main>
  );
}