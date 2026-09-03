import { User } from "../models/user.js";
import { getUsers, addUser } from "../data/userRepository.js";

function registerRoutes(app) {

    app.post("/api/register", (req, res) => {

        const { username, email, password, birthdate, age } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const exists = getUsers().find(u => u.email === email);
        if (exists) {
            return res.send({ ok: false, message: "Email already registered." });
        }

        const newUser = new User(username, email, password, birthdate, age);

        addUser(newUser);

        const { password: _pw, ...safeUser } = newUser;
        res.send({ ok: true, user: safeUser });
    });

}

export { registerRoutes };