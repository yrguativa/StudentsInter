import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

// Models
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  EndPoint = environment.apiEndpoint + '/api';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.EndPoint}/Subjects`);
  }
}
