import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import { Employee } from 'src/app/models/employeeSchema';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee : Employee=new Employee();
  id:string | undefined;
  create:boolean= true;
  edit:boolean=false;
  loginForm: FormGroup;
  constructor(private employeeService:EmployeeService,
    private router:Router, private route:ActivatedRoute, private formBuilder:FormBuilder) { }

  onSubmit(){
    console.log('submitted',this.employee)
    this.createEmployee();
  }

  createEmployee()
  {
    this.employeeService.createEmployee('add/employee',this.employee).subscribe(data=>
      {
        console.log('posted data',data),
        this.router.navigate(['/'])
      },
      error=>console.log(error))
  }

  editEmployee()
  {
    this.employeeService.editEmployee('employee',this.employee,this.id).subscribe(data=>
      {
        console.log('posted data',data)
      },
      error=>console.log(error))
  }

  getEmployee(id){
    console.log('in get')
    this.employeeService.getEmployeeById('employee',id).subscribe(data=> 
      {
        this.employee.firstName=data.firstName;
        this.employee.lastName=data.lastName;
        this.employee.email=data.email;
        this.employee.stafflevel=data.stafflevel;
        this.employee.baseSalary=data.baseSalary;
      })

      console.log(this.employee);
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      baseSalary: [null, [Validators.required,Validators.pattern('(?![0.]+$)[0-9]+(?:\\.[0-9]+)?')]],
      stafflevel: [null, Validators.required]
    });
   this.route.params.subscribe(params=>{
     this.id=params.id;
     if(params.id) {this.getEmployee(params.id)}});
     if(this.id !== undefined)
     {
       console.log('djfhkjgfdj')
        this.edit=true;
        this.create=false;
     }
  }
}
