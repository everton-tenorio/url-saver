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
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Arquivos:</h2>
      <ul>
        {files.map((file) => (
          <FileListItem key={file._id} file={file} />
        ))}
      </ul>
    </div>
  );
};

export default FileList;
