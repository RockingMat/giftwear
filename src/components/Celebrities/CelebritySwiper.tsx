// src/components/CelebritySwiper.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCelebrities } from '../../services/celebrityService';

interface CelebritySwiperProps {
  likedStyles: string[];
  setLikedStyles: React.Dispatch<React.SetStateAction<string[]>>;
}

const CelebritySwiper: React.FC<CelebritySwiperProps> = ({ likedStyles, setLikedStyles }) => {  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelebrityData = async () => {
      const data = await getCelebrities();
      setCelebrities(data);
    };
    fetchCelebrityData();
  }, []);

  useEffect(() => {
    if (likedStyles.length >= 5) {
      navigate('/catalog');
    }
  }, [likedStyles, navigate]);


  // Handle arrow key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handleSwipeLeft();
      } else if (event.key === 'ArrowRight') {
        handleSwipeRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, celebrities]);

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSwipeRight = () => {
    const currentStyle = celebrities[currentIndex]?.fields.Style;
    if (currentStyle && !likedStyles.includes(currentStyle)) {
      setLikedStyles((prev) => [...prev, currentStyle]);
    }
    setCurrentIndex((prev) => Math.min(prev + 1, celebrities.length - 1));
  };

  if (celebrities.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {currentIndex < celebrities.length ? (
          <div>
            <img
              src={celebrities[currentIndex].fields.Image[0].url}
              alt={celebrities[currentIndex].fields.CelebrityName}
              style={{ width: '300px', height: 'auto' }}
            />
            <p>{celebrities[currentIndex].fields.CelebrityName}</p>
          </div>
        ) : (
          <div>No more images</div>
        )}
      </div>

      <div>
        <button onClick={handleSwipeLeft}>⬅️</button>
        <button onClick={handleSwipeRight}>➡️</button>
      </div>

      <div>
        <h3>Liked Styles:</h3>
        <ul>
          {likedStyles.map((style, index) => (
            <li key={index}>{style}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CelebritySwiper;
