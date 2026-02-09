import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassDTO } from "../models/class.model";


@Injectable({    providedIn: 'root' })
export class ClassService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/classes';

    // Method to get all classes
    getClasses() :Observable<ClassDTO[]> {
        return this.http.get<ClassDTO[]>(this.apiUrl);
    }

    // Method to get a class by ID
    getClassById(classId: number) : Observable<ClassDTO> {
        return this.http.get<ClassDTO>(`${this.apiUrl}/${classId}`);
    }

    // Method to add a new class
    createClass(classe: ClassDTO) : Observable<ClassDTO> {
        return this.http.post<ClassDTO>(this.apiUrl, classe);
    }

    // Method to update a class
    updateClass(classId: number, classData: ClassDTO) : Observable<ClassDTO> {
        return this.http.put<ClassDTO>(`${this.apiUrl}/${classId}`, classData);
    }

    // Method to delete a class
    deleteClass(classId: number) : Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${classId}`);
    }

}  