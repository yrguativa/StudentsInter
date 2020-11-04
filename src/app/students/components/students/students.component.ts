import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Models
import { Student } from '../../models/student';

// Services
import { StudentsService } from '../../services/students.service';
import { StudentsFormsComponent } from '../students-forms/students-forms.component';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  Models: Student[];

  // UI
  load: boolean;
  constructor(
    private matDialog: MatDialog,
    private service: StudentsService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.LoadStudents();
  }

  addStudent(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '500px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      model: new Student()
    };
    const dialogRef = this.matDialog.open(StudentsFormsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data.model !== undefined) {
        const model: Student = data.model;
        this.service.createStudent(model).subscribe(rsl => {
          this.snackBar.open('Estudiante creado');
          this.LoadStudents();
        });
      }
    });

  }

  updateStudent(idx: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '500px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      model: this.Models[idx]
    };
    const dialogRef = this.matDialog.open(StudentsFormsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data.model !== undefined) {
        const model: Student = data.model;
        this.service.updateStudent(this.Models[idx].id, model).subscribe(rsl => {
          this.snackBar.open('Estudiante actualizado');
          this.LoadStudents();
        });
      }
    });

  }

  editUpdate(id: number): void {
    this.router.navigate(['/students/', id]);
  }

  private LoadStudents(): void {
    this.load = true;
    this.service.getStudents().subscribe(dt => {
      this.Models = dt;
      this.load = false;
    });
  }
}
