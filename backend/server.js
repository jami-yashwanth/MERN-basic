const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const List = require('./models/list')

dotenv.config();
app.use(cors());
app.use(express.json());

// DB-Connection
const uri = process.env.MONGO_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB connection established successfully')
})
 
app.post('/api' , async (req,res) => {
    const newItem = req.body;
    const newList = new List(newItem)
    await newList.save().then(() => res.send("List added successfully!!!"))
    .catch((Err) => console.log(Err))
})

app.get('/api/todo', (req,res) =>{
    List.find()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => console.log(err))
})

app.delete('/api/delete/:id', (req,res) => {
    List.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted!!!"))
    .catch((err) => res.json(err))
})

app.put('/api/update/:id', (req,res)=> {
    List.findById(req.params.id)
    .then(async (data) => {
        if(req.body.task !== null){
            data.task = req.body.task
            await data.save()
        }
    })
    .catch((err) => console.log(err))
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})