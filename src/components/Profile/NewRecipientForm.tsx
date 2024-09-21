// src/components/Recipient/NewRecipientForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipientApi } from '../../services/api';

const NewRecipientForm: React.FC = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await recipientApi.post('', { name, gender, age: parseInt(age, 10) });
      navigate('/celebrity'); // Redirect to celebrity page after successful creation
    } catch (err) {
      setError('Failed to create recipient. Please try again.');
      console.error('Error creating recipient:', err);
    }
  };

  return (
    <div className="new-recipient-form">
      <h2>Add New Recipient</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Recipient Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="0"
          />
        </div>
        <button type="submit">Add Recipient</button>
      </form>
    </div>
  );
};

export default NewRecipientForm;