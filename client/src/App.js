import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home.js"
import AddEdit from "./pages/AddEdit.js"
import View from "./pages/View.js"


function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <ToastContainer position='top-center' />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addStudent" element={<AddEdit/>} />
          <Route path="/View/:id" element={<View/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
