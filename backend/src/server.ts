import express from 'express';
import path from 'path';

import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json()); // pro express entender o json
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333); //localhost:3333 e esse número da porta pode ser trocado