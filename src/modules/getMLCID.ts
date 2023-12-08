import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const baseURL = 'https://www.mercadolibre.cl/p/';  

export const getMLCID = async (mlcID: string): Promise<string|null> => {

  try {
    let formattedMLCID = mlcID;
    
    if(mlcID.startsWith('MLC-'))  
      formattedMLCID = mlcID.substring(4);

    const result = {MLCID: formattedMLCID};
    fs.writeFileSync('result.json', JSON.stringify(result, null, 2));

    if(mlcID.startsWith('MLC-'))
      return formattedMLCID;

    const url = baseURL + formattedMLCID;  
    const response = await axios.get(url);

    const $ = cheerio.load(response.data, {xmlMode: false, decodeEntities: false});

    let content;
    const metaTag = $('meta[name="twitter:app:url:iphone"]');
    
    if (metaTag.length > 0)  
      content = metaTag.attr('content');

    if (content) {  
      const regex = /id=MLC(\d+)/;
      const mlcidMatch = regex.exec(content);

      if (mlcidMatch) 
        return mlcidMatch[1];
    }

    return formattedMLCID;

  } catch (error) {
    console.error('Error buscando MLCID', error);
    return null;  
  }

};