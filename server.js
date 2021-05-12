const express = require('express');
const mongoose = require('mongoose');

// .. Creating express server
const app = express();

// Connecting to a loca instance of mongodb
mongoose.connect("mongodb://localhost/user", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// TO parse json data
app.use(express.json());


// Creating user routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);


// listening to port
app.listen(3000, () => console.log('Server Started'));