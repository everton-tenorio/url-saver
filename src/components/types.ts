// src/components/types.ts
export interface File {
  _id: string;
  assunto: string;
  urls: string[];
}

export interface FileForm {
  assunto: string;
  urls: string[];
}
