// src/components/FileForm.tsx
import React, { useState } from 'react';
import api from '../services/api';

const FileForm: React.FC = () => {
  const [assunto, setAssunto] = useState('');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);

  const handleAddUrl = () => {
    if (url.trim() !== '') {
      setUrls([...urls, url.trim()]);
      setUrl('');
    }
  };

  const handleSaveFile = async () => {
    if (assunto.trim() === '' || urls.length === 0) {
      alert('Preencha o assunto e adicione pelo menos uma URL.');
      return;
    }

    try {
      await api.post('/files', { assunto, urls });
      alert(`Arquivo ${assunto}.json salvo com sucesso!`);
      setAssunto('');
      setUrls([]);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  return (
    <div>
      <h2>Novo Arquivo:</h2>
      <div>
        <label>Assunto:</label>
        <input type="text" value={assunto} onChange={(e) => setAssunto(e.target.value)} />
      </div>
      <div>
        <label>URL:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={handleAddUrl}>Adicionar URL</button>
      </div>
      <div>
        <ul>
          {urls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSaveFile}>Salvar Arquivo</button>
    </div>
  );
};

export default FileForm;
