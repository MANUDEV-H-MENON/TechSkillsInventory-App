const express = require('express');
const mongoose = require('mongoose');
const app = express();
const employeeModelExport = require('./models/employee.js')
const port = process.env.PORT || 3000;
const cors = require('cors');

const employeeRouter = express.Router();

employeeRouter.route('/employee')
.get(async(req,res)=>{
    try {
        const employee = await employeeModelExport.find({});
        res.status(200).json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
.post(async(req,res)=>{
    try {
        const employee = await employeeModelExport.create(req.body);
        res.status(200).json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

employeeRouter.route('/employee/:id')
.get(async(req,res)=>{
    try {
        const {id} = req.params;
        const employee = await employeeModelExport.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
.put(async(req,res)=>{
    try {
        const id = req.params.id;
        const employee = await employeeModelExport.findByIdAndUpdate(id, req.body);
        if(!employee)
        {
            return res.status(404).json({message: 'Cannot find employee with ID:  '+id})
        }
        const updatedEmployee = await employeeModelExport.findById(id);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
.delete(async(req,res)=>{
    try {
        const id = req.params.id;
        const employee = await employeeModelExport.findByIdAndDelete(id);
        if(!employee)
        {
            return res.status(404).json({message: 'Cannot find employee with ID:  '+id})
        }
        const updatedEmployee = await employeeModelExport.findById(id);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api',employeeRouter);
app.get('/', (req,res)=>{
    res.send('Hello ! This a sampleTest for DockerImages');
});



const mongoDBUrl = 'mongodb://IP:27017/test-db';

mongoose.set("strictQuery",false);
mongoose.connect(mongoDBUrl).then(()=>{
    console.log("Connected to mongoDB");
    app.listen(port, ()=>{
        console.log('Listening to ' + port);
    })
}).catch((error)=>
{
    console.log(error);
})