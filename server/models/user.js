class User {
    constructor(username, email, password, birthdate, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.age = age;
        this.role = "user"; // "user" | "groupAdmin" | "superAdmin"
        this.banned = false;
    }
}

export { User };