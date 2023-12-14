// src/components/FileForm.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { extractDomainName, getTitleFromUrl } from './urlUtils';


const FileForm: React.FC = () => {
  const [assunto, setAssunto] = useState('');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);

  // titulos
  const [titles, setTitles] = useState<string[]>([]);

  const handleAddUrl = async () => {
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    
    if (url.trim() !== '') {
      // titles cont
      const title = await getTitleFromUrl(url.trim());
      setTitles([...titles, title || '']);

      setUrls([...urls, formattedUrl.trim()]);
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
    <section>
    <div className="columns m-5">
      {/*<label>Novo Arquivo:</label>*/}
      <div className="column is-one-fifth">
        <input className="input is-rounded is-info" type="text" value={assunto} placeholder="Novo assunto" onChange={(e) => setAssunto(e.target.value)} />
      </div>
      <div className="column url-btn">
        <input className="input is-rounded is-link" type="text" value={url} placeholder="https://example.com" onChange={(e) => setUrl(e.target.value)} />
        <button className="button is-link is-rounded is-small is-light" onClick={handleAddUrl}>+ Adicionar URL</button>
      </div>
      <div className="column"> 
        <ul className="box">
          <p>// {assunto}</p>
          urls: [
            {urls.map((url, index) => ( 
              <li key={index}><a href={url}>&nbsp;&nbsp;{extractDomainName(url)} - {titles[index]}</a>,</li>
            ))} 
          ] 
        </ul>  
        <button className="button is-success is-rounded is-light" onClick={handleSaveFile}>Salvar</button>
      </div>
    </div>
    </section>
  );
};

export default FileForm;
