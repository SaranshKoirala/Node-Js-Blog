require('dotenv').config();

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const mainRoute = require('./server/routes/main');
const adminRoute = require('./server/routes/admin');

const connectDB = require('./server/config/db');
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', mainRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
