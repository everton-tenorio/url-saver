// src/components/FileListItem.tsx
import React from 'react';
import { File } from './types';

interface Props {
  file: File;
}

const FileListItem: React.FC<Props> = ({ file }) => {
  return (
    <li>
      <strong>{file.assunto}</strong>
      <ul>
        {file.urls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </li>
  );
};

export default FileListItem;
