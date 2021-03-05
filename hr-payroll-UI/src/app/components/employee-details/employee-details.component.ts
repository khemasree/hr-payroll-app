import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Employee } from 'src/app/models/employeeSchema';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['firstName', 'lastName', 'email', 'stafflevel', 'baseSalary',
  'federalTax','socialSecurityTax','medicare','salary','update','delete'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngAfterViewInit(): void {
   // this.dataSource.sort = this.sort;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public getAllEmployees=()=> {
    this.employeeService.getAllEmployees('employees').subscribe((res)=>{
      this.dataSource=res
    })
 }

 public redirectToDelete=(id)=>{
  this.employeeService.deleteEmployee('employee',id).subscribe((res)=>{
    this.getAllEmployees();
 });
}}
