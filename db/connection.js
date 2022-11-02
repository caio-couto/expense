const { connect } = require('mongoose');

connect('mongodb+srv://caio:Cavalcante12345.@main.ypjd0uo.mongodb.net/expense?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>
{
    console.log('Servidor conectado com sucesso');
})
.catch((error) => console.log(error));

