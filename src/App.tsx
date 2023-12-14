// src/App.tsx

import React from 'react';
import FileList from './components/FileList';
import FileForm from './components/FileForm';
import 'bulma/css/bulma.min.css';
import './App.css';
import './style.scss';

export {};

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="title m-5"><i className="fa-solid fa-link"></i> URL-SAVER</h1> 
      <FileForm />
      <FileList />
    </div>
  );
}

export default App;
