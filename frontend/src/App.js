import "./index.css";
import React from "react";
import PriceCalculationUi from "./components/priceCalculationUi/priceCalculationUi";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <PriceCalculationUi />
      <img id="bg-img" src="https://th.bing.com/th/id/R.a47d3b9b429f6b5897d2ca06ea835161?rik=gD5%2f3%2bM%2fQUnQCw&pid=ImgRaw&r=0" alt="" />
    </>
  );
}

export default App;
