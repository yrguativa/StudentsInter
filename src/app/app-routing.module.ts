import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './students/components/student/student.component';
import { StudentsComponent } from './students/components/students/students.component';


const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: '',   redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
