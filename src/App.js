import React, { createContext, useState } from 'react';
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

export const AppContext = createContext('')

function App() {
  const [search, setSearch] = useState('')

  return (
    <div className="wrapper">
    <AppContext.Provider value={{search, setSearch}}>
     <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </AppContext.Provider>
  </div>
  );
}

export default App;
