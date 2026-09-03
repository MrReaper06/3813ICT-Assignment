import { loadData, saveData } from "./store.js";
import { User } from "../models/user.js";

const FILE = "users.json";

function defaultUsers() {
    const user = new User("regularUser", "user@example.com", "user123", "1998-04-12", 27);

    const admin = new User("groupAdmin", "admin@example.com", "admin123", "1990-01-01", 36);
    admin.role = "groupAdmin";

    const superAdmin = new User("superAdmin", "super@example.com", "super123", "1985-06-15", 41);
    superAdmin.role = "superAdmin";

    return [user, admin, superAdmin];
}

let users = loadData(FILE, defaultUsers());

function getUsers() {
    return users;
}

function addUser(user) {
    users.push(user);
    saveData(FILE, users);
}

function saveUsers() {
    saveData(FILE, users);
}

export { getUsers, addUser, saveUsers };