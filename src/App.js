import React from 'react';
import './App.css';
import Dice from './components/Dice';
import { Provider } from 'react-redux';
import store from './store';
import Field from './components/playing-field/Field';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Field />
        <Dice />
      </div>
    </Provider>
  );
}

export default App;
