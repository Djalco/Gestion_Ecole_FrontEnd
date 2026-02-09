import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubjectDTO } from "../models/subject.model";
    
@Injectable({ providedIn: 'root' })
export class SubjectService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/v1/subjects';

    // Method to get all subjects
    getSubjects() : Observable<SubjectDTO[]> {
        return this.http.get<SubjectDTO[]>(this.apiUrl);
    }

    // Method to get a subject by ID
    getSubjectById(subjectId: number) : Observable<SubjectDTO> {
        return this.http.get<SubjectDTO>(`${this.apiUrl}/${subjectId}`);
    }

    // Method to add a new subject
    createSubject(subject: any) : Observable<SubjectDTO> {
        return this.http.post<SubjectDTO>(this.apiUrl, subject);
    }

    // Method to update a subject
    updateSubject(subjectId: number, subjectData: SubjectDTO) : Observable<SubjectDTO> {
        return this.http.put<SubjectDTO>(`${this.apiUrl}/${subjectId}`, subjectData);
    }

    // Method to delete a subject   
    deleteSubject(subjectId: number) : Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${subjectId}`);
    }



}