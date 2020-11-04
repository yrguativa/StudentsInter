import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Student
import { Student } from '../../models/student';

@Component({
  selector: 'app-students-forms',
  templateUrl: './students-forms.component.html',
  styleUrls: ['./students-forms.component.scss']
})
export class StudentsFormsComponent implements OnInit {

  Model: Student;
  constructor(
    private dialogRef: MatDialogRef<StudentsFormsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar
  ) {
    this.Model = { ...data.model };
  }

  ngOnInit(): void {
  }

  save(identification: string, name: string): void {
    if (identification.length > 15) {
      this.snackBar.open('La identificación debe tener solo 15 caracteres');
    }
    this.Model.identification = identification;
    this.Model.name = name;
    this.dialogRef.close({
      model: this.Model
    });
  }
}
