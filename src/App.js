import React, {Fragment} from 'react';
import './App.css';
import Header from './components/Header';
import MemeGenerator from './components/MemeGenerator';

function App() {
  return (
    <Fragment>
      <Header />
      <MemeGenerator />
    </Fragment>
  );
}

export default App;
