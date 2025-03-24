import styles from "@/components/Card2.module.css"
import Image from "next/image";


interface CardProps {
    imageUrl: string;
    title: string;
    buttonText: string;
  }
  
  const Card2: React.FC<CardProps> = ({ imageUrl, title, buttonText }) => {
    return (
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={imageUrl} alt="Card Image" />
        </div>
        <div className={styles.cardContent}>
          <p>{title}</p>
          <button>{buttonText}</button>
        </div>
      </div>
    );
  };
  
  export default Card2;