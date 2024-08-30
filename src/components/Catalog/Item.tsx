import React from 'react';
import "../../style.scss";
import { useSwiper } from 'swiper/react';

interface ItemProps {
  src: string;
  index: number;
  alt: string;
  customClass: string;
  width: number;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ src, index, alt, customClass, width, onClick }) => {
  const swiper = useSwiper();
  const handleItemClick = () => {
    swiper.slideTo(index);
    onClick();
    
  }
  return (
    <div className={`item flex items-center justify-center cursor-pointer w-[${width}px] h-[500px]  ${customClass} border-8 border-black`} onClick={handleItemClick}>
      <img className="object-cover w-full h-full" src={src} alt={alt} />
    </div>
  );
};

export default React.memo(Item, (prevProps, nextProps) => {
  // Only re-render if any of the props change
  return (
    prevProps.src === nextProps.src
  );
});
