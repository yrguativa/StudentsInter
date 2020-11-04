import { Student } from './student';
import { Teacher } from './teacher';

export interface Subject {
    id: number;
    name: string;
    credits: number;
    teacherId: number;
    teacher: Teacher;
    students: Student;
}