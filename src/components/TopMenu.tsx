import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material'


export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className = {styles.menucontainer}>
            <Image src = {'/img/logo.png'} className = {styles.logoimg} alt = 'logo' width = {0} height = {0} sizes = "100vh"/>
            <TopMenuItem  title = 'Companies' pageRef = '/companies'/>
            {
                session?<TopMenuItem  title = 'New Booking' pageRef = '/booking'/>:null
            }
            {
                session?<TopMenuItem  title = 'My Booking' pageRef = "/mybooking"></TopMenuItem>:null
            }



            <div className='flex flex-row items-center absolute right-0 h-full px-5 text-cyan-600 text-sm'>
            {
                session? <Link href = "/api/auth/signout">
                    <div className='flex items-center h-full px-5 text-black text-sm'>Sign-Out of {session.user?.name}</div>
                </Link>
                :<Link href = "/login">
                    <div className='no-underline flex items-center h-full px-5 text-blue-600 text-xl border border-blue-600 font-sans rounded-lg hover:bg-blue-100 transition'>Sign-In</div>
                </Link>
            }
            </div>
        </div>
    );
}