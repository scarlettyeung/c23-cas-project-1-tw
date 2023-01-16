import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { useRootSelector } from './redux/store';

function App() {
  const isAuth = useRootSelector((state) => state.auth.isAuth);
  console.log(isAuth);

  return (
    <div className='App'>
      <header className='App-header'>
        <div>App</div>
        <div>{isAuth ? <Home /> : <Login />}</div>
      </header>
    </div>
  );
}

export default App;
