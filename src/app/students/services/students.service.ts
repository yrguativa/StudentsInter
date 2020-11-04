import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Models
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  EndPoint = environment.apiEndpoint + '/api';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.EndPoint}/Students`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.EndPoint}/Students/${id}`);
  }

  createStudent(model: Student): Observable<number> {
    return this.http.post<number>(`${this.EndPoint}/Students`, model);
  }

  updateStudent(id: number, model: Student): Observable<number> {
    return this.http.put<number>(`${this.EndPoint}/Students/${id}`, model);
  }
}
