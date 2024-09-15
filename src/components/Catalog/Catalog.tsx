import { useState, useEffect } from 'react';
import { getUpperwearItems } from '../../services/catalogueService';
import ItemList from './ItemList';
import { useNavigate } from 'react-router-dom';
import "../../style.scss";
import { product, slide } from '../Interfaces/Item';
import ItemInformation from './ItemInformation';

interface CatalogProps {
  likedStyles: string[];
  setItem: React.Dispatch<React.SetStateAction<any>>;
}

const Catalog: React.FC<CatalogProps> = ({ likedStyles, setItem }) => {
 
  const [items, setItems] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [styling, setStyling] = useState(false);
  const navigate = useNavigate();
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const handleAddToCart = () => {
    setItem(items[activeIndex]);
    setStyling(true);
  }
  useEffect(() => {
    if (styling) {
      navigate('/styling');
    }
  }, [styling, navigate]);

  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        const data = await getUpperwearItems();
        if (data.length === 0) {
          setError('No items found in the catalog.');
        } else {
          //add only data with a name field to the items array
          setItems(data.filter((item: { fields: { Name?: string } }) => item.fields.Name !== undefined));          //setItems(data);
        }
      } catch (error) {
        setError('Error fetching catalog data.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  else if (error) return <div className="error">{error}</div>;

  
  else{
    const upperwearSlides: slide[] = items.map(item => ({
      image: item.fields["Model"]?.[0].url,
      name: item.fields.Name
    }));
    const productSlides: product[] = items.map(item => ({
      imageUrl: item.fields["Front"]?.[0].url,
      price: item.fields.Status,
      title: item.fields.Name
    }));
      return (
      <div className="flex h-screen w-screen bg-white">
        {/* Left Component - 2/3 of the screen */}
        <div className="basis-2/3 container mx-auto overflow-hidden">
          <ItemList 
            name="upperwear" 
            items = {upperwearSlides} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            height={150} 
            controlledSwiper={secondSwiper}
            setControlledSwiper={setFirstSwiper}
          />
        </div>
        {/* Right Component - 1/3 of the screen */}
        <div className="basis-1/3 container mx-auto overflow-hidden">
          
          <ItemInformation
            items={productSlides}
            onClick={handleAddToCart}
            controlledSwiper={firstSwiper}
            setControlledSwiper={setSecondSwiper}
            setActiveIndex={setActiveIndex}
            />
        </div>
      </div>
    );
  }
};
export default Catalog;
