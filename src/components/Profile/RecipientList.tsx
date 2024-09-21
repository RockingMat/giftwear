import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { recipientApi } from '../../services/api';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './RecipientList.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Recipient {
  _id: string;
  name: string;
  gender: string;
  age: number;
}

const RecipientList: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await recipientApi.get('');
        setRecipients(response.data);
      } catch (error) {
        console.error('Error fetching recipients:', error);
      }
    };

    fetchRecipients();
  }, []);

  const handleCardClick = (recipientId: string) => {
    navigate(`/catalog/${recipientId}`);
  };

  const handleAddRecipient = () => {
    navigate('/add-recipient');
  };

  const layout = recipients.map((recipient, index) => ({
    i: recipient._id,
    x: index % 3,
    y: Math.floor(index / 3),
    w: 1,
    h: 1,
  }));

  return (
    <div className="recipient-list">
      <h2>Your Recipients</h2>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={200}
      >
        {recipients.map((recipient) => (
          <div key={recipient._id} onClick={() => handleCardClick(recipient._id)}>
            <div className="contact-card">
              <h3>{recipient.name}</h3>
              <p>Gender: {recipient.gender}</p>
              <p>Age: {recipient.age}</p>
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
      <button className="add-recipient-button" onClick={handleAddRecipient}>
        +
      </button>
    </div>
  );
};

export default RecipientList;