import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentDTO } from "../models/student.model";


@Injectable({ providedIn: 'root' })
export class StudentService {
  
    private apiUrl = 'http://localhost:8080/api/students'; // Adjust the URL as needed
    private http = inject(HttpClient);

    // Method to get all students
    getStudents() : Observable<StudentDTO[]> {
        return this.http.get<StudentDTO[]>(this.apiUrl);
    }

    // Method to get a student by ID
    getStudentById(studentId: number) : Observable<StudentDTO> {
        return this.http.get<StudentDTO>(`${this.apiUrl}/${studentId}`);
    }

    // Method to add a new student
    createStudent(student: StudentDTO) : Observable<StudentDTO> {
        return this.http.post<StudentDTO>(this.apiUrl, student);
    }

    // Method to update a student
    updateStudent(studentId: number, studentData: StudentDTO) : Observable<StudentDTO> {
        return this.http.put<StudentDTO>(`${this.apiUrl}/${studentId}`, studentData);
    }

    // Method to delete a student
    deleteStudent(studentId: number) : Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
    }

}