//Using Express
const express = require('express');

//using mongoose
const mongoose=require('mongoose')

//create an instance of express
const app = express();
app.use(express.json())

//Sample in-memory storage for todo items
//let todos = []; 

//connecting DB
mongoose.connect('mongodb://localhost:27017/Mern-App-To-Do-List')
.then(()=> {
    console.log('DB Connected!')
})
.catch((err) => {
    console.log(err)
})

//creating schema
const todoSchema= new mongoose.Schema({
    title: 
    {
        required: true,
        type: String
    },
    description: String
})

//creating model
const todoModel=mongoose.model('To-Do-List-Values',todoSchema);

//Create a new todo item
app.post('/todos',async (req, res) => {
    const {title, description} = req.body;

    //for using only in program
    /*const newTodo = {
    id: todos.length+1,
    title,
    description
    };
    todos.push(newTodo);
    console.log(todos);*/

    try
    {
        const newTodo=new todoModel({title,description})
        await newTodo.save()
        res.status(201).json(newTodo);
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//get all items
app.get('/todos',async (req,res) => {
    try
    {
        const todos= await todoModel.find();
        res.json(todos);
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//update a todo item
app.put('/todos/:id',async(req,res) => {
    try
    {
        const {title, description} = req.body;
        const id=req.params.id;
        const updatedtodo=await todoModel.findByIdAndUpdate(
            id,
            {title,description},
            {new:true}
        )
        if(!updatedtodo)
        {
            return res.status(404).json({message:"Todo not found"})
        }
        res.json(updatedtodo)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//delete a item
app.delete('/todos/:id',async (req,res) => {
    try
    {
        const id=req.params.id;
        await todoModel.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//Start the server
const port = 3000;
app.listen(port, () => {
    console.log("Server is listening to port "+port);
})
