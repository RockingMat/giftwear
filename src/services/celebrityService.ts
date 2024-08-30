// src/services/celebrityService.ts

export const getCelebrities = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/celebrities');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching celebrity data:', error);
      return [];
    }
  };
  