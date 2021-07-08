const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true , useCreateIndex : true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB connection established successfully')
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(PORT , () => {
    console.log(`Server is running on port : ${PORT}`);
})

