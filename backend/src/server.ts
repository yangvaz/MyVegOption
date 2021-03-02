import express from 'express';
import path from 'path';
import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(express.json()); // pro express entender o json
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);

app.listen(3333); //localhost:3333 e esse número da porta pode ser trocado