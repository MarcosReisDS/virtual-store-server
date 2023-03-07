require('dotenv').config();
import UserController from '../Controller/UserController'
import ProductController from '../Controller/ProductController'
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(cors())

const hostname = 'localhost';
const port = 5000;

app.use("/user", UserController);
app.use("/product", ProductController);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});