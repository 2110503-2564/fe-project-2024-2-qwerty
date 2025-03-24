import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem({title, pageRef}: {title:string, pageRef:string}) {
      return (
            <Link className={styles.itemcontainer} href = {pageRef}>
                  <div className='flex items-center justify-center h-full px-5 text-black-200 text-sm font-sans'>{title}</div>
            </Link>
      );
}