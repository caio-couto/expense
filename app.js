const express = require('express');
const app = express();
const port = 5000;

const db = require('./db/connection');

const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', projectRoutes);
app.use('/', categoryRoutes);

app.get('/', (req, res) =>
{
    res.json('hello world');
});

app.listen(port, () =>
{
    console.log(`Servidor iniciado na porta ${port}`);
});