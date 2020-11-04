import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Student } from '../../models/student';
import { StudentsService } from '../../services/students.service';
import { StudentSubjectAddComponent } from '../student-subject-add/student-subject-add.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  Model: Student;
  LimitCredits: number;
  Credits: number;

  // UI
  load: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private service: StudentsService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.LimitCredits = 9;
    this.Credits = this.LimitCredits;
    this.load = true;
    this.activatedRoute.params.subscribe(parmts => {
      let id = 0;
      if (parmts.id !== undefined && parmts.id !== null) {
        id = parseInt(parmts.id, 10);
        return this.service.getStudent(id).subscribe(dt => {
          this.Model = dt;
          this.Model.subjects.forEach(sb => {
            this.Credits -= sb.credits;
          });
          this.load = false;
        });
      }
    });
  }

  addSubject(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '500px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      model: this.Model
    };
    const dialogRef = this.matDialog.open(StudentSubjectAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data.model !== undefined) {
        const model: Student = data.model;
        this.service.updateStudent(this.Model.id, model).subscribe(rsl => {
          this.snackBar.open('Asignatura relacionada');
        });
      }
    });

  }

}
