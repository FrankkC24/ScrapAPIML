import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

import { checkGroupStatus } from './modules/checkInvitation';

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.disable('x-powered-by');

app.post('/invitacion/:link(*)', async (req: Request<{ link: string }>, res: Response<{ message: string }>) => {
  const { link } = req.params;

  if (!link || typeof link !== 'string') {
    return res.status(400).json({ message: 'El enlace ingresado no corresponde a una invitación de Spotify, ingrese una invitación correcta.' });
  }

  try {
    const groupStatus: string = await checkGroupStatus(link);
    res.status(200).json({ message: groupStatus });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al verificar el estado del grupo.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
