import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// Components
import { StudentsComponent } from './components/students/students.component';
import { StudentsFormsComponent } from './components/students-forms/students-forms.component';
import { StudentComponent } from './components/student/student.component';
import { StudentSubjectAddComponent } from './components/student-subject-add/student-subject-add.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StudentsComponent,
    StudentsFormsComponent,
    StudentComponent,
    StudentSubjectAddComponent,
  ],
  entryComponents: [
    StudentsFormsComponent,
    StudentSubjectAddComponent,
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule {
}

