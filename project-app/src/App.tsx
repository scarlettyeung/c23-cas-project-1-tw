import React from "react";
import "./App.css";
const REACT_APP_BACKEND_URL = "http://localhost:8080"

function App() {
  async function loadData() {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/test`);
    const resp = await res.json();
    console.log(resp);
  }
  loadData();
  return (
    <div className="App">
      <header className="App-header">
        <div></div>
      </header>
    </div>
  );
}

export default App;
