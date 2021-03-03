import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

const routes: Routes = [
  {path: "employees", component: EmployeeDetailsComponent},
  {path: "", component: EmployeeDetailsComponent},
  {path:'employees/add',component:EmployeeCreateComponent},
  {path:'employees/add/:id',component:EmployeeCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
