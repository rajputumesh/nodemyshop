const express = require('express');
const UserController = require('./Controller/UserController');
const UserValidation = require('./Validation/UserValidation');
//const routes = require('./Routes/index');
const app = express();
const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
const db = require('./Models');
db.sequelize.sync({force:false});

const port = process.env.PORT || 5000;
app.set('view engine','ejs');
app.get('/',(req, res)=>{
    res.render('base',{title:"My Node App"});
});

//app.use('/api',routes);

app.get('/user',UserController.index);
app.post('/user',UserValidation.stote,UserController.store);
app.get('/user/:id',UserController.edit);
app.put('/user/:id',UserValidation.update,UserController.update);
app.delete('/user/:id',UserController.delete);

app.get('/user',UserController.index);
app.post('/user',UserValidation.stote,UserController.store);
app.get('/user/:id',UserController.edit);
app.put('/user/:id',UserValidation.update,UserController.update);
app.delete('/user/:id',UserController.delete);

app.listen(port);