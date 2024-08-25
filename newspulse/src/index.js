import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import News from './App';
import Nav from './nav.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <>
      <Nav />
      <Routes>
        <Route path="/Apple" element={<News newsName="iphone" />} />
        <Route path="/Tesla" element={<News newsName="tesla" />} />
        <Route path="/Bitcoin" element={<News newsName="bitcoin" />} />
        <Route path="/nasa" element={<News newsName="nasa" />} />
        <Route path="/upsc" element={<News newsName="upsc" />} />
      </Routes>
    </>
  </BrowserRouter>
);

reportWebVitals();