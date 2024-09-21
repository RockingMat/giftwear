// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CelebritySwiper from './components/Celebrities/CelebritySwiper';
import Catalog from './components/Catalog/Catalog';
import Styling from './components/Styling/Styling';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './style.scss';
import NewRecipientForm from './components/Profile/NewRecipientForm';
import RecipientList from './components/Profile/RecipientList';

const App: React.FC = () => {
  const [likedStyles, setLikedStyles] = useState<string[]>([]);
  const [item, setItem] = useState<any | null>(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><Navigate to="/catalog" replace /></ProtectedRoute>} />
          <Route path="/catalog" element={
            <ProtectedRoute>
              <Catalog likedStyles={likedStyles} setItem={setItem}/>
            </ProtectedRoute>
          } />
          {/* <Route path="/catalog/:recipientId" element={
            <ProtectedRoute>
              <Catalog likedStyles={likedStyles} setItem={setItem}/>
            </ProtectedRoute>
          } /> */}
          
          <Route path="/styling" element={
            <ProtectedRoute>
              <Styling upperwearItem={item}/>
            </ProtectedRoute>
          } />
          <Route path="/celebrity/:recipientId" element={
            <ProtectedRoute>
              <CelebritySwiper likedStyles={likedStyles} setLikedStyles={setLikedStyles}/>
            </ProtectedRoute>
          } />
          <Route path="/add-recipient" element={
            <ProtectedRoute>
              <NewRecipientForm/>
            </ProtectedRoute>
          } />
          <Route path="/recipient-list" element={
            <ProtectedRoute>
              <RecipientList/>
            </ProtectedRoute>
          } />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;