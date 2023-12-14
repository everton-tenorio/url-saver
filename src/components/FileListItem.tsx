// src/components/FileListItem.tsx
import React from 'react';
import { File } from './types';
import { extractDomainName } from './urlUtils';

interface Props {
  file: File;
}

const FileListItem: React.FC<Props> = ({ file }) => {
  // Verifique se file.urls é uma array antes de chamar map
  const urls = Array.isArray(file.urls) ? file.urls : [];

  return ( 
      <div className="column is-one-third">
          <div className="card">
            <header className="card-header">
              <strong className="card-header-title">{file.assunto}</strong>
            </header>

            <div className="card-content">
              <div className="content">
                <ul>
                  {urls.map((url, index) => (
                    <li key={index}><a href={url}>{extractDomainName(url)}</a></li>
                  ))}
                </ul>
              </div>
            </div>  
          </div>
       </div>  
  );
};

export default FileListItem;