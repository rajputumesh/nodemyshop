const express = require('express');
const app = express();
const multer = require('multer');
const db = require('./Models');

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
db.sequelize.sync({force:false});
const port = process.env.PORT || 5000;
app.set('view engine','ejs');
app.get('/',(req, res)=>{
    res.render('base',{title:"My Node App"});
});

//middleware
const authenticate = require('./middleware/AuthMiddleware');
//user
const LoginController = require('./Controller/LoginController');
const UserController = require('./Controller/UserController');
const UserValidation = require('./Validation/UserValidation');

//order
const OrderController = require('./Controller/OrderController');
const OrderValidation = require('./Validation/OrderValidation');

//brand
const BrandController = require('./Controller/BrandController');
const BrandValidation = require('./Validation/BrandValidation');

//category
const CategoryController = require('./Controller/CategoryController');
const CategoryValidation = require('./Validation/CategoryValidation');

//product
const ProductController = require('./Controller/ProductController');
const ProductValidation = require('./Validation/ProductValidation');


//user routes
app.get('/user',authenticate.auth,UserController.index);
app.post('/user',authenticate.auth,UserValidation.store,UserController.store);
app.get('/user/:id',authenticate.auth,UserController.edit);
app.put('/user/:id',authenticate.auth,UserValidation.update,UserController.update);
app.delete('/user/:id',authenticate.auth,UserController.delete);

//brands route
app.get('/brand',authenticate.auth,BrandController.index);
app.post('/brand',authenticate.auth,BrandValidation.stote,BrandController.store);
app.get('/brand/:id',authenticate.auth,BrandController.edit);
app.put('/brand/:id',authenticate.auth,BrandValidation.update,BrandController.update);
app.delete('/brand/:id',authenticate.auth,BrandController.delete);

//Category route
app.get('/category',authenticate.auth,CategoryController.index);
app.post('/category',authenticate.auth,CategoryValidation.stote,CategoryController.store);
app.get('/category/:id',authenticate.auth,CategoryController.edit);
app.put('/category/:id',authenticate.auth,CategoryValidation.update,CategoryController.update);
app.delete('/category/:id',authenticate.auth,CategoryController.delete);

//Product route
var storage = multer.diskStorage(
  {
      filename: function ( req, file, cb ) {
          const filename = Date.now()+file.originalname;
          req.image = filename;
          cb( null, filename);
      }
  }
);
const upload = multer({ 
  dest: 'uploads/',
  storage:storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  filename: function (req, file, cb) {
    
  }
});

app.get('/product',authenticate.auth,ProductController.index);
app.post('/product',upload.single('image'),authenticate.auth,ProductValidation.stote,ProductController.store);
app.get('/product/:id',authenticate.auth,ProductController.edit);
app.put('/product/:id',upload.single('image'),authenticate.auth,ProductValidation.update,ProductController.update);
app.delete('/product/:id',authenticate.auth,ProductController.delete);

// admin all order
app.get('/order',authenticate.auth,authenticate.admin,OrderController.index);

//api auth route

//Auth route
app.post('/login',UserValidation.auth,LoginController.login);
app.post('/register',UserValidation.store,LoginController.register);
app.post('/logout',authenticate.auth,UserController.logout);

//product
app.get('/api/product',ProductController.index);
app.get('/api/product/:id',ProductController.edit);
app.get('/api/brand/:id/product',ProductController.brandproduct);
app.get('/api/category/:id/product',ProductController.categoryproduct);

//orders route
app.get('/api/order',authenticate.auth,OrderController.userorder);
app.post('/api/order',authenticate.auth,OrderValidation.stote,OrderController.store);
app.get('/api/order/:id',authenticate.auth,OrderController.edit);
app.put('/api/order/:id',authenticate.auth,OrderValidation.update,OrderController.update);
app.delete('/api/order/:id',authenticate.auth,OrderController.delete);

app.listen(port);