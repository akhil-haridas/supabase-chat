import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatPage, LoginPage } from './pages';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;