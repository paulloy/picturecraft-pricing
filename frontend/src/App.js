import "./index.css";
import React from "react";
import Header from "./components/header/Header";
import { Routes, Route } from 'react-router-dom';
import { PriceCalculationPage, SettingsPage } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PriceCalculationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <img id="bg-img" src="https://th.bing.com/th/id/R.a47d3b9b429f6b5897d2ca06ea835161?rik=gD5%2f3%2bM%2fQUnQCw&pid=ImgRaw&r=0" alt="" />
    </>
  );
}

export default App;
