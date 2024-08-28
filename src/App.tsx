// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CelebritySwiper from './components/Celebrities/CelebritySwiper';
import Catalog from './components/Catalog/Catalog';
import './style.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CelebritySwiper />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </Router>
  );
};

export default App;
