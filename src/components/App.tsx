// src/components/App.tsx
export {};

import React from 'react';
//import './App.css';
import FileList from './FileList';
import FileForm from './FileForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>URL Saver</h1>
      <FileList />
      <FileForm />
    </div>
  );
}

export default App;
