export interface ClassDTO {
    id?: number;
    name: string;
    //students: any[]; // You can replace 'any' with a specific Student interface if you have one
}
export interface Class {
    id: number;
    name: string;
    //students: Student[]; // Assuming you have a Student interface defined
}