// src/services/catalogueService.ts

export const getUpperwearItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Upperwear');
      const data = await response.json();
      const filteredData = data.filter((item: { fields: { Name?: string} }) => item.fields.Name);
      return filteredData;
    } catch (error) {
      console.error('Error fetching catalogue data:', error);
      return [];
    }
  };

  export const getLowerwearItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Lowerwear');
      const data = await response.json();
      const filteredData = data.filter((item: { fields: { 'Front Image'?: any } }) => item.fields['Front Image']);
      return filteredData;
    } catch (error) {
      console.error('Error fetching catalogue data:', error);
      return [];
    }
  };

  export const getFootwearItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Footwear');
      const data = await response.json();
      const filteredData = data.filter((item: { fields: { 'Front Image'?: any } }) => item.fields['Front Image']);
      return filteredData;
    } catch (error) {
      console.error('Error fetching catalogue data:', error);
      return [];
    }
  };
  