export interface User {
    username: string;
    email: string;
    birthdate: string;
    age: number;
    role: "user" | "groupAdmin" | "superAdmin";
    banned: boolean;
}
