import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core/primitives/di";
import { TeacherDTO } from "../models/teacher.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TeacherService {
    private apiUrl = 'http://localhost:8080/api/v1/teachers'; 
    private http = inject(HttpClient);

    // Method to get all teachers
    getTeachers() : Observable<TeacherDTO[]> {
        return this.http.get<TeacherDTO[]>(this.apiUrl);
    }   

    // Method to get a teacher by ID
    getTeacherById(teacherId: number) : Observable<TeacherDTO> {
        return this.http.get<TeacherDTO>(`${this.apiUrl}/${teacherId}`);
    }

    // Method to add a new teacher
    createTeacher(teacher: TeacherDTO) : Observable<TeacherDTO> {
        return this.http.post<TeacherDTO>(this.apiUrl, teacher);
    }

    // Method to update a teacher
    updateTeacher(teacherId: number, teacherData: TeacherDTO) : Observable<TeacherDTO> {
        return this.http.put<TeacherDTO>(`${this.apiUrl}/${teacherId}`, teacherData);
    }

    // Method to delete a teacher
    deleteTeacher(teacherId: number) : Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${teacherId}`);
    }


}