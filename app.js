const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

//Environment Variables
require('dotenv').config();
const api = process.env.API_URL;
const db = process.env.CONNECTION_STRING;

//Routes
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');

//Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));

//authentication
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
//error handler
app.use(errorHandler);

//Routers
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/categories`, categoriesRoutes)

//Database
mongoose.connect(db ,{
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
.then(()=>{
    console.log('Database connection ready');
})
.catch((err)=> {
    console.log(err);
})

const PORT = process.env.PORT || 3000;
//Server
app.listen(PORT, ()=>{
    console.log(api);
    console.log('Server is running http://localhost:3000');
})