import "./App.css";
import React from "react";
import Header from "./components/Header";
import ShortenForm from "./components/ShortenForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ShortenForm />
    </div>
  );
}

export default App;
