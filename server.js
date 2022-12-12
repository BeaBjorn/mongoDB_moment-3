

require('dotenv').config()


const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/courses', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("We are connected to the database!"));

app.use(express.json());
const coursesRouter = require('./routes/courses');
app.use('/courses', coursesRouter);

app.listen(3000, () => console.log('Server up and running!'));

