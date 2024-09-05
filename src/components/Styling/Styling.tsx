import React, { useEffect, useState } from 'react';
import { getLowerwearItems, getFootwearItems } from "../../services/catalogueService";
import { slide } from '../Interfaces/Item';
import ItemList from '../Catalog/ItemList';

interface StylingProps {
    upperwearItem: any;
}

const Styling: React.FC<StylingProps> = ({ upperwearItem }) => {
    const [lowerwearItems, setLowerwearItems] = useState<any[]>([]); 
    const [lowerwearActiveIndex, setLowerwearActiveIndex] = useState(0); 
    const [footwearItems, setFootwearItems] = useState<any[]>([]);
    const [footwearActiveIndex, setFootwearActiveIndex] = useState(0);

    useEffect(() => {
        const fetchLowerwearItems = async () => {
            try {
                const data = await getLowerwearItems();
                if (data.length === 0) {
                    console.error('No lowerwear items found in the catalog.');
                } else {
                    setLowerwearItems(data);
                }
            } catch (error) {
                console.error('Error fetching lowerwear items:', error);
            }
        };
    
        const fetchFootwearItems = async () => {
            try {
                const data = await getFootwearItems();
                if (data.length === 0) {
                    console.error('No footwear items found in the catalog.');
                } else {
                    setFootwearItems(data);
                }
            } catch (error) {
                console.error('Error fetching footwear items:', error);
            }
        };
    
        fetchLowerwearItems();
        fetchFootwearItems();
    }, []);
    const lowerwearSlides: slide[] = lowerwearItems.map(item => ({
        image: item.fields["Front Image"]?.[0].url,
        name: "slide"
    }));
    
    const footwearSlides: slide[] = footwearItems.map(item => ({
        image: item.fields["Front Image"]?.[0].url,
        name: "slide"
    }));
    return (
        <div className="flex flex-col justify-between h-screen w-screen border-8 border-black bg-gray-100 p-4">
          {/* Upperwear Image */}
          <div className="flex justify-center items-center h-1/3 border-8 border-black">
            <img
              src={upperwearItem.fields["Front"]?.[0].url}
              alt={upperwearItem.fields.Name}
              className="object-contain max-h-full"
            />
          </div>
      
          {/* Lowerwear Component */}
          <div className="container mx-auto my-4 border-8 border-black">
            <ItemList
              name="lowerwear"
              items={lowerwearSlides}
              activeIndex={lowerwearActiveIndex}
              setActiveIndex={setLowerwearActiveIndex}
              height={20}
            />
          </div>
      
          {/* Footwear Component */}
          <div className="container mx-auto border-8 border-black">
            <ItemList
              name="footwear"
              items={footwearSlides}
              activeIndex={footwearActiveIndex}
              setActiveIndex={setFootwearActiveIndex}
              height={10}
            />
          </div>
        </div>
      );      
           
};

export default Styling;