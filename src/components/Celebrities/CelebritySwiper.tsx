import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { getCelebrities } from '../../services/celebrityService';
import '../../style.scss';
import './celebrityStyles.css'
interface CelebritySwiperProps {
  likedStyles: string[];
  setLikedStyles: React.Dispatch<React.SetStateAction<string[]>>;
}

const CelebritySwiper: React.FC<CelebritySwiperProps> = ({ likedStyles, setLikedStyles }) => {
  const [celebrities, setCelebrities] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelebrityData = async () => {
      const data = await getCelebrities();
      setCelebrities(data.reverse()); // Reverse to show last card first
    };
    fetchCelebrityData();
  }, []);

  useEffect(() => {
    if (likedStyles.length >= 5) {
      navigate('/catalog');
    }
  }, [likedStyles, navigate]);
  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <div className='cardContainer'>
        {celebrities.map((celebrity) => (
          <TinderCard className='swipe' key={celebrity.fields.CelebrityName}>
            <div style={{ backgroundImage: 'url(' + celebrity.fields.Image[0].url + ')' }} className='card'>
              <h3>{celebrity.fields.CelebrityName}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );

  // const onSwipe = (direction: string, celebrity: any) => {
  //   if (direction === 'right') {
  //     const style = celebrity.fields.Style;
  //     if (style && !likedStyles.includes(style)) {
  //       setLikedStyles((prev) => [...prev, style]);
  //     }
  //   }
  //   if (celebrities.length === 1) {
  //     navigate('/catalog');
  //   }
  // };
  
    
  {/* return (
    <div className="w-full max-w-sm mx-auto">
      <div className="card-container">
        {celebrities.map((celebrity) => (
          <TinderCard
            key={celebrity.id}
            onSwipe={(dir) => onSwipe(dir, celebrity)}
            preventSwipe={['up', 'down']}
            className="swipe absolute"
          >
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={celebrity.fields.Image[0].url} 
                alt={celebrity.fields.CelebrityName} 
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{celebrity.fields.CelebrityName}</h2>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  ); */}
};

export default CelebritySwiper;