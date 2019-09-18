import React from 'react';
import './App.css';
import Dice from './components/Dice';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dice />
      </div>
    </Provider>
  );
}

export default App;
