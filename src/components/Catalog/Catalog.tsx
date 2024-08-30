import { useState, useEffect } from 'react';
import { getCatalogueItems } from '../../services/catalogueService';
import ItemList from './ItemList';
import { useNavigate } from 'react-router-dom';
import CatalogItemCard from './CatalogItemCard';
import "../../style.scss";

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
        const data = await getCatalogueItems();
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
    const activeItem = items[activeIndex];
    return (
      <div className="flex h-screen w-screen border-8 border-black">
        {/* Left Component - 2/3 of the screen */}
        <div className="flex-2 container mx-auto overflow-hidden">
          <ItemList items = {items} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        </div>
        {/* Right Component - 1/3 of the screen */}
        <div className="flex-1 container mx-auto overflow-hidden">
          
          <CatalogItemCard 
            title={activeItem.fields.Name}
            price={activeItem.fields.Status}
            imageUrl={activeItem.fields["Front"]?.[0].url}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    );
  }
};
export default Catalog;
