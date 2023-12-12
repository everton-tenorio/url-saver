// src/components/FileList.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FileListItem from './FileListItem';
import { File } from './types';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const response = await api.get('/files');
      setFiles(response.data || []); // Certifique-se de que response.data seja um array ou inicialize como um array vazio
    } catch (error) {
      console.error('########Error fetching files:', error);
    }
  };

  fetchFiles();
}, []);

  return (
    <div>
      <h2>Arquivos:</h2>
      <ul>
  {Array.isArray(files) ? (
    files.map((file) => (
  <FileListItem key={file.assunto} file={file} />
))

  ) : (
    <p>No files available</p>
  )}
</ul>
    </div>
  );
};

export default FileList;
