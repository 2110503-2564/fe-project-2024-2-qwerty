'use client'

import styles from './card.module.css';
import InteractiveCard from './InteractiveCard';
import Image from 'next/image';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function Card({venueName, imgSrc, onRate}: {venueName:string, imgSrc:string, onRate?:Function}) {	
	const [rating, setRating] = useState(0);
	return (
		<InteractiveCard contentName = {venueName}>
			<div className = "w-full h-[70%] relative rounded-t-lg">
			<Image src = {imgSrc} 
			alt = 'Venue Picture' 
			fill = {true}
			className = 'object-cover rounded-t-lg'/>
			</div>
			<div className = "w-full h-[15%] px-3 py-2">{venueName}</div>
			{onRate? <Rating id = {venueName + ' Rating'} name = {venueName + ' Rating'} data-testid = {venueName + ' Rating'} value = {rating} precision={0.5} className = "h-[10%] px-2" onClick = {(e) => {e.stopPropagation()}} onChange={(e, newValue) => {e.stopPropagation; onRate(venueName, newValue); setRating(newValue??0);}}></Rating>:''}
		</InteractiveCard>
	);
}