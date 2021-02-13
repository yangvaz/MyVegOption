import express from 'express';

import './database/connection';

const app = express();

app.use(express.json()); // pro express entender o json

app.get('/users', (request,  response) => {
  return response.json({ message: 'Hello Github' });
});

app.listen(3333); //localhost:3333 e esse número da porta pode ser trocado