const express = require('express');
const router = express.Router();
const employee = require('../../app/models/employee');
const ObjectId = require('mongodb').ObjectID;

exports.findAll = async function (req, res) {
    await employee.find().then(employee => {
        console.log('employee', employee)
        res.status(200).json(employee);
    }).catch(err => {
        res.status(500).send(err);
    })
}

//create employee
exports.create = async function (req, res) {
    var employeeData = req.body;
    var baseSalary = employeeData.baseSalary;
    var totalDeductions = 0
    deductions = {
        "socialSecurity": 6.2,
        "federalTax": 12,
        "medicare": 1.45
    }
    if (baseSalary) {
        employeeData.socialSecurityTax = (baseSalary * deductions["socialSecurity"]) / 100;
        employeeData.federalTax = (baseSalary * deductions["federalTax"]) / 100;
        employeeData.medicare = (baseSalary * deductions["medicare"]) / 100;
        totalDeductions = employeeData.socialSecurityTax + employeeData.federalTax + employeeData.medicare;
    }
    salary = baseSalary - totalDeductions;
    employeeData['salary'] = salary;
    await employee.create(employeeData).then(employee1 => {
        return res.status(200).json(employee1);
    }).catch(err => res.status(500).send(err));

}

//find employee by id
exports.findOne = async function (req, res) {
    await employee.findById({ _id: req.params.id }).then(
        employeeData => {
            if (!employeeData) { res.status(404).send() }
            res.status(200).json(employeeData)
        }).catch(err => res.status(500).send(err));
}

//Update employee
exports.update = async function (req, res) {
    var employeeData = req.body;
    var baseSalary = employeeData.baseSalary;
    var totalDeductions = 0
    deductions = {
        "socialSecurity": 6.2,
        "federalTax": 12,
        "medicare": 1.45
    }
    if (baseSalary) {
        employeeData.socialSecurityTax = (baseSalary * deductions["socialSecurity"]) / 100;
        employeeData.federalTax = (baseSalary * deductions["federalTax"]) / 100;
        employeeData.medicare = (baseSalary * deductions["medicare"]) / 100;
        totalDeductions = employeeData.socialSecurityTax + employeeData.federalTax + employeeData.medicare;
    }
    salary = baseSalary - totalDeductions;
    employeeData['salary'] = salary;
    var newEmployee = {
        $set: employeeData
    }

    if (!employeeData) {
        return res.status(400).json({
            "error": "Bad Data"
        });
    } else {
        await employee.findByIdAndUpdate({ _id: req.params.id }, newEmployee, { new: true }).
            then(emp => {
                if (!emp) { return res.status(404).send() }
                res.status(200).send(emp);
            }).catch(err => res.status(500).send())
    }
}

//delete employees
exports.delete= async function(req,res){
    await employee.remove({_id: req.params.id}).
    then(emp=>{
        if(!emp){res.status(404).send()}
        res.status(200).send()}).catch(err=>res.status(500).send())
}


//var mongojs=require('mongojs');
//var db=mongojs('mongodb+srv://mongouser1:mongouser1@cluster0.yt8nk.mongodb.net/employees?retryWrites=true&w=majority',['employee_data']);


// exports.getEmployees = async function(req,res){
//     await db.employee.find(function(err, employees){
//         if(err){
//             return res.status(500).send(err);
//         }
//         return res.status(200).json(employees);
//     }
// }
