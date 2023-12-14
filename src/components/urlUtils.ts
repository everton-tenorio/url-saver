// urlUtils.ts
import axios from 'axios';
import cheerio from 'cheerio';

// Função de regex para extrair o nome do domínio
export const extractDomainName = (url: string) => {
  // eslint-disable-next-line 
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/:]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

// Função que retorna o título da URL
export const getTitleFromUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extrai o título da tag <title>
    const pageTitle = $('title').text();

    // Extrai o título do elemento <head><title></title></head>
    const headTitle = $('head title').text();

    // Extrai o conteúdo da tag meta com propriedade name="twitter:title"
    const twitterTitle = $('meta[name="twitter:title"]').attr('content') || '';

    // Retorna o título prioritizando o título da tag <title>, se disponível
    return pageTitle || headTitle || twitterTitle || null;
  } catch (error) {
    console.error('Erro ao obter o título da URL:', error);
    return '...';
  }
};
