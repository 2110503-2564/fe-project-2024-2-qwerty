import Image from "next/image";

interface CardPProps {
  imageUrl: string;
  name: string;
  bio: string;
}

const CardP: React.FC<CardPProps> = ({ imageUrl, name, bio }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center w-[500px]">
      <div className="flex justify-center items-center mb-6">
     
        <img
          src={imageUrl}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full"
        />
      
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-500 mb-1">New York, United States</p>
        <p className="text-gray-500 mb-1">{bio}</p>
        <p className="text-gray-500 mb-4">Chula</p>
     
      </div>
    </div>
  );
};

export default CardP;