import React, { useState } from 'react';
import './scss/app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

  const [search, setSearch] = useState('')

  return (
    <div className="wrapper">
    <Header search={search} setSearch={setSearch} />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home search={search}/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  </div>
  );
}

export default App;
