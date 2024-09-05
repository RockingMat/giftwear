// src/App.tsx

import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CelebritySwiper from './components/Celebrities/CelebritySwiper';
import Catalog from './components/Catalog/Catalog';
import Styling from './components/Styling/Styling';
import './style.scss';

const App: React.FC = () => {
  const [likedStyles, setLikedStyles] = useState<string[]>([]);
  const [item, setItem] = useState<any | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CelebritySwiper likedStyles={likedStyles} setLikedStyles={setLikedStyles}/>} />
        <Route path="/catalog" element={<Catalog likedStyles={likedStyles} setItem={setItem}/>} />
        <Route path="/styling" element={<Styling upperwearItem={item}/>} />
      </Routes>
    </Router>
  );
};

export default App;
