// App.js
import React from 'react';
import { BrowserRouter , Routes, Route,  } from 'react-router-dom';
import Home from './components/home';
import CreateUser from './components/CreateUser';
const App = () => {
    return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      
      </Routes>
    </BrowserRouter>
    );
}

export default App;
