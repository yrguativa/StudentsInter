import { Component, Inject, OnInit } from '@angular/core';

// Services
import { SubjectsService } from '../../services/subjects.service';

// Models
import { Subject } from '../../models/subject';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-subject-add',
  templateUrl: './student-subject-add.component.html',
  styleUrls: ['./student-subject-add.component.scss']
})
export class StudentSubjectAddComponent implements OnInit {

  FormSubject = this.fb.group({
    subject: new FormControl(null, Validators.required)
  });

  Model: Student;
  Subjects: Subject[];
  SubjectSelect: Subject;
  Alerts: string[];

  constructor(
    private dialogRef: MatDialogRef<StudentSubjectAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private service: SubjectsService
  ) {
    this.Model = { ...data.model };
    console.log(`mod`, this.Model);
  }

  ngOnInit(): void {
    this.Alerts = [];
    this.service.getStudents().subscribe(dt => {
      this.Subjects = dt;
    });
    this.FormSubject.get('subject').valueChanges.subscribe((selectedValue: number) => {
      this.SubjectSelect = this.Subjects.find(sb => sb.id.toString() === selectedValue.toString());
      console.log(`SubjectSelect`, this.SubjectSelect);
      console.log(`this.Model.subjects`, this.Model.subjects);
      if (this.Model.subjects !== undefined && this.Model.subjects !== null) {
        let subjectFind: Subject = undefined;
        this.Model.subjects.forEach(sb => {
          if (sb.teacherId.toString() === this.SubjectSelect.teacherId.toString()) {
            subjectFind = sb;
          }
        });
        console.log(`subjectFind`, subjectFind);
        if (subjectFind !== undefined && subjectFind !== null) {
          if (!this.Alerts.includes('Ya tiene clases con el profesor')) {
            this.Alerts.push('Ya tiene clases con el profesor');
          }
        } else if (this.Alerts.includes('Ya tiene clases con el profesor')) {
          console.log(`dsf`);
          this.Alerts = this.Alerts.filter(alt => alt !== 'Ya tiene clases con el profesor');
        }
      }
    });

  }


  save(): void {

    this.Model.subjects.push(this.SubjectSelect);

    this.dialogRef.close({
      model: this.Model
    });
  }

}
