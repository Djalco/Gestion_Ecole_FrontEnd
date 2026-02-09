export interface TeacherDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    subjectId?: number; // Assuming a teacher can be associated with a subject
}