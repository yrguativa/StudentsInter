import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectAddComponent } from './student-subject-add.component';

describe('StudentSubjectAddComponent', () => {
  let component: StudentSubjectAddComponent;
  let fixture: ComponentFixture<StudentSubjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubjectAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
