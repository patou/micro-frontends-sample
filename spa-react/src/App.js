import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'spa-common-bandeau/dist/spa-common-bandeau/index.js';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    document.querySelector("#bandeau").addEventListener('selectUser', e => {
      console.log(e.detail);
      setUser(e.detail);
    });
  })

  return (
    <div className="App">
      <common-bandeau id="bandeau" selectedApp="AUTRE">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          {user.firstname} {user.lastname}
          </p>
        </header>
      </common-bandeau>
    </div>
  );
}

export default App;
