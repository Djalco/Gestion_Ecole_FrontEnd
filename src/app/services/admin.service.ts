import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AdminDTO } from "../models/admin.model";

export class AdminService {

    private apiUrl = 'http://localhost:8080/api/v1/admins'; // Adjust the URL as needed
    private http = inject(HttpClient);

    // Method to get all admins
    getAdmins() : Observable<AdminDTO[]> {
        return this.http.get<AdminDTO[]>(this.apiUrl);
    }

    // Method to get an admin by ID
    getAdminById(adminId: number) : Observable<AdminDTO> {
        return this.http.get<AdminDTO>(`${this.apiUrl}/${adminId}`);
    }

    // Method to add a new admin
    createAdmin(admin: AdminDTO) : Observable<AdminDTO> {
        return this.http.post<AdminDTO>(this.apiUrl, admin);
    }

    // Method to update an admin    
    updateAdmin(adminId: number, adminData: AdminDTO) : Observable<AdminDTO> {
        return this.http.put<AdminDTO>(`${this.apiUrl}/${adminId}`, adminData);
    }

    // Method to delete an admin
    deleteAdmin(adminId: number) : Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${adminId}`);
    }


}