const express = require('express');
const math = require('mathjs');
const router = express.Router();
const employee = require('../../app/models/employee');
const ObjectId = require('mongodb').ObjectID;

//Find all employees
exports.findAll = async function (req, res) {
    await employee.find().then(employee => {
        res.status(200).json(employee);
    }).catch(err => {
        res.status(500).send(err);
    })
}

//create an employee
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
        employeeData.socialSecurityTax = math.round(baseSalary * deductions["socialSecurity"]) / 100;
        employeeData.federalTax = math.round(baseSalary * deductions["federalTax"]) / 100;
        employeeData.medicare = math.round(baseSalary * deductions["medicare"]) / 100;
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

//Update an employee
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
    console.log('employeeData.socialSecurityTax',employeeData.socialSecurityTax)
    console.log('employeeData.socialSecurityTax.tpfixed',employeeData.socialSecurityTax.toFixed(2))
    console.log('employeeData.socialSecurityTax/100',Math.round(employeeData.socialSecurityTax)/100)

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