const { connect } = require('mongoose');

const dbName = 'name';
const dbPassword = 'password'

connect(`mongodb+srv://${dbName}:${dbPassword}.@main.ypjd0uo.mongodb.net/expense?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>
{
    console.log('Servidor conectado com sucesso');
})
.catch((error) => console.log(error));

