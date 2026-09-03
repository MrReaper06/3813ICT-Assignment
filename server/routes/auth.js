// Handles login, for now it will check the login credentials against an array

import { User } from "../models/user.js";

const testUser = new User("normalUser", "user@example.com", "user123", "1988-05-14", 38);
const testGroupAdmin = new User("groupAdminUser", "groupadmin@example.com", "admin123", "2003-10-22", 22);
const testSuperAdmin = new User("superAdminUser", "superadmin@example.com", "super123", "1965-01-05", 61);

testGroupAdmin.role = "groupAdmin"
testSuperAdmin.role = "superAdmin"

const USERS = [testUser, testGroupAdmin, testSuperAdmin];

function authRoutes(app) {
    app.post("/api/auth", (req, res) => {
        if (!req.body || !req.body.email || !req.body.password) {
            return res.sendStatus(400);
        }

        const match = USERS.find(
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
