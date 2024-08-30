// src/services/catalogueService.ts

export const getCatalogueItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/catalogue');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching catalogue data:', error);
      return [];
    }
  };
  