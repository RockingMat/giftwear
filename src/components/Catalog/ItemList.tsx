import React from 'react';
import Item from './Item';
import { gsap } from 'gsap';
import "../../style.scss";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

interface ItemListProps {
  items: any[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ItemList: React.FC<ItemListProps> = ({items, activeIndex, setActiveIndex}) => {
  let itemWidth = 300;
  
  const handleClick = (index: number) => {
    setActiveIndex(index);
    items.forEach((_, idx) => {
      const itemClass = `.item-${idx + 1}`;
      const isSelected = index === idx;

      gsap.to(itemClass, {
        duration: 2,
        scale: isSelected ? 1 : 0.8,
        ease: 'elastic.out(1, 0.85)',
      });
      gsap.to(itemClass, {
        duration: 0,
        filter: isSelected ? 'blur(0)' : 'blur(10px)',
      });
    });
  }

  //print items
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      speed={1000}
      centeredSlides={true}
    >
      {items.map((item, index) => {
        return(
        <SwiperSlide key={index}>
          <Item
            src={item.fields["Model"]?.[0].url}
            index={index}
            alt={item.fields.name}
            width={itemWidth}
            customClass={`item-${index + 1} ${index === activeIndex ? '' : 'blur-md scale-[0.8]'}`}
            onClick={() => handleClick(index)}
          />
        </SwiperSlide>)
      })}
    </Swiper>
  );
};

export default ItemList;
