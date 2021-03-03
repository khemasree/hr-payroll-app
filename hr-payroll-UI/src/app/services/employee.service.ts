import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employeeSchema';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl='http://localhost:3000';

  constructor( private http:HttpClient,private router:Router) { 

  }

  createEmployee(route:string, employee:Employee):Observable<Employee>
  {
      return this.http.post<Employee>(`${this.baseUrl}/${route}`,employee);
  }

  editEmployee(route:string, employee:Employee,id:string):Observable<Employee>
  {
      return this.http.put<Employee>(`${this.baseUrl}/${route}/${id}`,employee);
  }

  getAllEmployees(route:string):Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}/${route}`);
  }

  getEmployeeById(route:string,id:string):Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}/${route}/${id}`);
  }

  deleteEmployee(route:string,id:string):Observable<Employee>
  {
    return this.http.delete<Employee>(`${this.baseUrl}/${route}/${id}`);
  }
}
