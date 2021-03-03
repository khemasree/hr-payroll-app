
var mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        default: '',
        index: true
    },
    lastName: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    stafflevel: {
        type: String,
        required: false,
        default: ''
    },
    baseSalary: {
        type: Number,
        required: true,
        default: ''
    },
    salary: {
        type: Number,
        required: false,
        default: ''
    },
    federalTax: {
        type: Number,
        required: false,
        default: ''
    },
    socialSecurityTax: {
        type: Number,
        required: false,
        default: ''
    },
    medicare: {
        type: Number,
        required: false,
        default: ''
    }
},
    {
        collection: 'employee_data'
    }
)

module.exports = mongoose.model('employee', employeeSchema);