// src/components/FileListItem.tsx
import React from 'react';
import { File } from './types';

interface Props {
  file: File;
}

const FileListItem: React.FC<Props> = ({ file }) => {
  // Verifique se file.urls é uma array antes de chamar map
  const urls = Array.isArray(file.urls) ? file.urls : [];

  return (
    <li>
      <strong>{file.assunto}</strong>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </li>
  );
};

export default FileListItem;