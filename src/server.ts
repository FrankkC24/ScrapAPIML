import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

import { checkGroupStatus } from './modules/checkInvitation';
import { validateSpotifyLink } from './utils/validateLink';
import { getMLCID } from './modules/getMLCID';

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.disable('x-powered-by');

app.post('/invitacion/:link(*)', async (req: Request<{ link: string }>, res: Response<{ message: string }>) => {
  const { link } = req.params;
  const validationResult = validateSpotifyLink(link);

  if (!validationResult.isValid) {
    return res.status(400).json({ message: validationResult.message });
  }

  const spotifyInviteLink = validationResult.spotifyInviteLink;
  
  try {
    const groupStatus = await checkGroupStatus(spotifyInviteLink);
    res.status(200).json({ message: groupStatus });
  } catch (error: any) {
    res.status(500).json({ message: `Error al verificar el estado del grupo (endpoint): ${error.message}` });
  }
});

app.get('/scrape/:mlcID', async (req, res) => {
  const mlcID = req.params.mlcID;

  const mlcid = await getMLCID(mlcID);

  if (mlcid) {
    res.json({MLCID: mlcid});
  } else {
    res.status(404).json({error: 'No se encontró el MLCID'});
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
