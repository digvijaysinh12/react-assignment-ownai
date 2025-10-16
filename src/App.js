// src/App.js
import React from "react";
import "./App.css";
import PurchaseOrderForm from "./componets/PurchaseOrderForm";
import { POProvider } from "./context/POContext";

function App() {
  return (
    <POProvider>
      <div className="App">
        <PurchaseOrderForm />
      </div>
    </POProvider>
  );
}

export default App;
