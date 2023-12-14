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
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);



  return (
    <section className="has-background-dark">
    <div className="container p-5">
      <h2 className="subtitle pt-5"># TOPICS</h2>
        <div className="columns is-multiline">
          {Array.isArray(files) ? (
            files.map((file) => (
              <FileListItem key={file._id || file.assunto} file={file} />
            ))
          ) : (
            <p>No files available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FileList;
