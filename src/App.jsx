import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Counties from './pages/Counties';
import CountyDetails from './pages/CountyDetails';
import Identify from './pages/Identify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="identify" element={<Identify />} />
          <Route path="counties" element={<Counties />} />
          <Route path="counties/:key" element={<CountyDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
