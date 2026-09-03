import { User } from "../models/user.js";

let users = [];

function getUsers() {
    return users;
}

function addUser(user) {
    users.push(user);
}

function registerRoutes(app) {

    app.post("/api/register", (req, res) => {

        const { username, email, password, birthdate, age } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const exists = getUsers().find(u => u.email === email);
        if (exists) {
            return res.send({ ok: false, message: "This email has already been registered." });
        }

        const newUser = new User(username, email, password, birthdate, age);
        addUser(newUser);

        const { password: _pw, ...safeUser } = newUser;
        res.send({ ok: true, user: safeUser });
    });

}

export { registerRoutes };