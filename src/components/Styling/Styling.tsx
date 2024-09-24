import React, { useEffect, useState } from 'react';
import { getLowerwearItems, getFootwearItems } from "../../services/catalogueService";
import { slide } from '../Interfaces/Item';
import ItemList from '../Catalog/ItemList';
import { recipientApi } from '../../services/api';
import { useParams } from 'react-router-dom';
interface StylingProps {
    upperwearItem: any;
}

const Styling: React.FC<StylingProps> = ({ upperwearItem }) => {
    const { recipientId } = useParams<{ recipientId: string }>();
    const [lowerwearItems, setLowerwearItems] = useState<any[]>([]); 
    const [lowerwearActiveIndex, setLowerwearActiveIndex] = useState(0); 
    const [footwearItems, setFootwearItems] = useState<any[]>([]);
    const [footwearActiveIndex, setFootwearActiveIndex] = useState(0);
    const [headshot, setHeadshot] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const [headshotFile, setHeadshotFile] = useState<File | null>(null); // Store the file

    // New state for the form
    const [message, setMessage] = useState('');
    const [occasion, setOccasion] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchRecipient = async () => {
          const response = await recipientApi.get(`/${recipientId}`);
          if (response.data.picture) {
            setHeadshot(`http://localhost:3000${response.data.picture}`);
          }
        };
      
        fetchRecipient();
      }, [recipientId]);

    useEffect(() => {
        const fetchLowerwearItems = async () => {
            try {
                const data = await getLowerwearItems();
                setLowerwearItems(data.length ? data : []);
            } catch (error) {
                console.error('Error fetching lowerwear items:', error);
            }
        };
    
        const fetchFootwearItems = async () => {
            try {
                const data = await getFootwearItems();
                setFootwearItems(data.length ? data : []);
            } catch (error) {
                console.error('Error fetching footwear items:', error);
            }
        };
    
        fetchLowerwearItems();
        fetchFootwearItems();
    }, []);

    const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeadshot(reader.result as string);
                //setHeadshotFile(file); // Store the file for upload
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeHeadshot = () => {
        setHeadshot(null);
        //setHeadshotFile(null);
    };

    const lowerwearSlides: slide[] = lowerwearItems.map(item => ({
        image: item.fields["Front Image"]?.[0].url,
        name: "slide"
    }));
    
    const footwearSlides: slide[] = footwearItems.map(item => ({
        image: item.fields["Front Image"]?.[0].url,
        name: "slide"
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ message, occasion, date });
        // uploadHeadshot(headshotFile, recipientId!, setError); 
    };

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            {/* Left side - Styling */}
            <div className="w-1/2 p-4 flex flex-col justify-between border-r border-gray-300">
                {/* Headshot upload button and error message */}
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeadshotUpload}
                        style={{ display: 'none' }}
                        id="headshot-upload"
                    />
                    <label htmlFor="headshot-upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-2">
                        Upload Headshot
                    </label>
                    {headshot && (
                        <button 
                            onClick={removeHeadshot}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Remove Headshot
                        </button>
                    )}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                {/* Upperwear Image with Headshot */}
                <div className="flex justify-center items-center h-1/3 relative">
                    {headshot && (
                        <img
                            src={headshot}
                            alt="Recipient Headshot"
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                    )}
                    <img
                        src={upperwearItem.fields["Front"]?.[0].url}
                        alt={upperwearItem.fields.Name}
                        className="object-contain max-h-full"
                    />
                </div>
        
                {/* Lowerwear Component */}
                <div>
                    <ItemList
                        name="lowerwear"
                        items={lowerwearSlides}
                        activeIndex={lowerwearActiveIndex}
                        setActiveIndex={setLowerwearActiveIndex}
                        height={20}
                    />
                </div>
        
                {/* Footwear Component */}
                <div>
                    <ItemList
                        name="footwear"
                        items={footwearSlides}
                        activeIndex={footwearActiveIndex}
                        setActiveIndex={setFootwearActiveIndex}
                        height={10}
                    />
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">Card Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="message" className="block mb-2">Personalized Message:</label>
                        <textarea 
                            id="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={4}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="occasion" className="block mb-2">Occasion:</label>
                        <select 
                            id="occasion" 
                            value={occasion} 
                            onChange={(e) => setOccasion(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select an occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="holiday">Holiday</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2">Date of Occasion:</label>
                        <input 
                            type="date" 
                            id="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save Card Information
                    </button>
                </form>
            </div>
        </div>
    );      
};

export default Styling;
