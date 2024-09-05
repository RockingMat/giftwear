import React from 'react';
import "../../style.scss";
import { useSwiper } from 'swiper/react';

interface ItemProps {
  src: string;
  index: number;
  alt: string;
  customClass: string;
  height: number;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ src, index, alt, customClass, height, onClick }) => {
  const swiper = useSwiper();
  const handleItemClick = () => {
    swiper.slideTo(index);
    onClick();
    
  }
  console.log(height);
  return (
    <div
      className={`flex items-center justify-center cursor-pointer ${customClass} border-4 border-black bg-white rounded-lg`}
      onClick={handleItemClick}
    >
      <img src={src} alt={alt} className={`object-contain`} style={{ maxHeight: `${height}rem` }} />
    </div>
  );
};

export default React.memo(Item, (prevProps, nextProps) => {
  // Only re-render if any of the props change
  return (
    prevProps.src === nextProps.src
  );
});
