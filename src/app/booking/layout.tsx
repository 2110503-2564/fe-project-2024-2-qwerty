import React from 'react';
import styles from './booking.module.css'

export default function BookingLayout({children}:{children:React.ReactNode}){
      return (
            <div className = {styles.sectionLayout}>
                  {children}
            </div>
      );
}