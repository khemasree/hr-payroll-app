var express=require('express');
var router=express.Router();
var Employee = require('../../app/models/employee');
var employeeService=require('../../app/services/employeeService');
//var mongojs=require('mongojs');
//var db=mongojs('mongodb+srv://mongouser1:mongouser1@cluster0.yt8nk.mongodb.net/employees?retryWrites=true&w=majority',['employee_data']);


// router.get('/employees', async function(req,res){
//     await employee.find(function(err, employees){
//         if(err){
//             return res.status(500).send(err);
//         }
//         return res.status(200).json(employees);
//     });
// });



router.post('/add/employee',employeeService.create);

router.get('/employees',employeeService.findAll);

router.get('/employee/:id',employeeService.findOne);

router.put('/employee/:id',employeeService.update);

router.delete('/employee/:id',employeeService.delete);


module.exports=router;