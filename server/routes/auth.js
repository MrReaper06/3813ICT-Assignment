import { getUsers } from "../data/userRepository.js";

function authRoutes(app) {

    app.post("/api/auth", (req, res) => {

        if (!req.body || !req.body.email || !req.body.password) {
            return res.sendStatus(400);
        }

        const users = getUsers();
        const match = users.find(
            u => u.email === req.body.email && u.password === req.body.password
        );

        if (!match) {
            return res.send({ valid: false });
        }

        if (match.banned) {
            return res.send({ valid: false, banned: true });
        }

        const { password, ...safeUser } = match;
        res.send({ valid: true, ...safeUser });
    });

}

export { authRoutes };