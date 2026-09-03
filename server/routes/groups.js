import { Group } from "../models/group.js";
import { Channel } from "../models/channel.js";
import { GroupRequest } from "../models/groupRequest.js";
import { getRequests, addRequest, saveRequests } from "../data/groupRequestRepository.js";
import { getChannels, addChannel, saveChannels } from "../data/channelRepository.js";
import { getUsers } from "../data/userRepository.js";
import { getGroups, addGroup, saveGroups } from "../data/groupRepository.js";

function groupRoutes(app) {
    app.post("/api/groups/request", (req, res) => {
        const { name, description, ageLimit, colorTheme, requestedByUserId } = req.body;

        if (!name || !requestedByUserId) {
            return res.sendStatus(400);
        }

        const request = new GroupRequest(name, description, ageLimit, colorTheme, requestedByUserId);
        addRequest(request);
        res.send({ ok: true, request });
    });

    app.get("/api/groups/requests/mine", (req, res) => {
        const email = req.query.email;
        const mine = getRequests().filter(r => r.requestedByUserId === email);
        res.send(mine);
    });

    app.get("/api/groups/requests/pending", (req, res) => {
        const pending = getRequests().filter(r => r.status === "pending");
        res.send(pending);
    });

    app.post("/api/groups/requests/:id/approve", (req, res) => {
        const requests = getRequests();
        const request = requests.find(r => r.id === req.params.id);

        if (!request) {
            return res.sendStatus(404);
        }

        const group = new Group(
            request.name, request.description, request.ageLimit,
            request.colorTheme, request.requestedByUserId
        );
        addGroup(group);

        request.status = "approved";
        saveRequests();

        res.send({ ok: true, group });
    });

    app.post("/api/groups/requests/:id/reject", (req, res) => {
        const { reason } = req.body;

        if (!reason) {
            return res.sendStatus(400);
        }

        const request = getRequests().find(r => r.id === req.params.id);
        if (!request) {
            return res.sendStatus(404);
        }

        request.status = "rejected";
        request.rejectionReason = reason;
        saveRequests();

        res.send({ ok: true });
    });

    app.get("/api/groups", (req, res) => {
        res.send(getGroups());
    });

    app.post("/api/groups/:groupId/channels/request", (req, res) => {
        const { name, requestedByUserId } = req.body;

        if (!name || !requestedByUserId) {
            return res.sendStatus(400);
        }

        const channel = new Channel(req.params.groupId, name, requestedByUserId);
        addChannel(channel);
        res.send({ ok: true, channel });
    });

    app.get("/api/groups/:groupId/channels", (req, res) => {
        const channels = getChannels().filter(
            c => c.groupId === req.params.groupId && c.status === "approved"
        );
        res.send(channels);
    });

    app.get("/api/groups/:groupId/channels/pending", (req, res) => {
        const pending = getChannels().filter(
            c => c.groupId === req.params.groupId && c.status === "pending"
        );
        res.send(pending);
    });

    app.post("/api/groups/:groupId/channels/:channelId/approve", (req, res) => {
        const channel = getChannels().find(c => c.id === req.params.channelId);
        if (!channel) {
            return res.sendStatus(404);
        }

        channel.status = "approved";
        saveChannels();
        res.send({ ok: true, channel });
    });

    app.post("/api/groups/:groupId/channels/:channelId/reject", (req, res) => {
        const { reason } = req.body;

        if (!reason) {
            return res.sendStatus(400);
        }

        const channel = getChannels().find(c => c.id === req.params.channelId);
        if (!channel) {
            return res.sendStatus(404);
        }

        channel.status = "rejected";
        channel.rejectionReason = reason;
        saveChannels();
        res.send({ ok: true });
    });

    app.get("/api/groups/mine", (req, res) => {
        const email = req.query.email;
        const mine = getGroups().filter(g => g.adminIds.includes(email));
        res.send(mine);
    });

    app.get("/api/groups/:groupId/members", (req, res) => {
        const group = getGroups().find(g => g.id === req.params.groupId);
        if (!group) {
            return res.sendStatus(404);
        }

        const users = getUsers();
        const members = users.filter(u => group.memberIds.includes(u.email))
            .map(({ password, ...safe }) => safe);
        const banned = users.filter(u => group.bannedUserIds.includes(u.email))
            .map(({ password, ...safe }) => safe);

        res.send({ members, banned });
    });

    app.post("/api/groups/:groupId/promote", (req, res) => {
        const { userEmail } = req.body;
        const group = getGroups().find(g => g.id === req.params.groupId);
        if (!group) {
            return res.sendStatus(404);
        }

        if (!group.adminIds.includes(userEmail)) {
            group.adminIds.push(userEmail);
        }
        saveGroups();
        res.send({ ok: true });
    });

    app.post("/api/groups/:groupId/demote", (req, res) => {
        const { userEmail } = req.body;
        const group = getGroups().find(g => g.id === req.params.groupId);
        if (!group) {
            return res.sendStatus(404);
        }

        if (group.adminIds.length <= 1) {
            return res.send({ ok: false, message: "A group must always have at least one admin." });
        }

        group.adminIds = group.adminIds.filter(id => id !== userEmail);
        saveGroups();
        res.send({ ok: true });
    });

    app.post("/api/groups/:groupId/ban", (req, res) => {
        const { userEmail } = req.body;
        const group = getGroups().find(g => g.id === req.params.groupId);
        if (!group) {
            return res.sendStatus(404);
        }

        group.memberIds = group.memberIds.filter(id => id !== userEmail);
        if (!group.bannedUserIds.includes(userEmail)) {
            group.bannedUserIds.push(userEmail);
        }
        saveGroups();
        res.send({ ok: true });
    });

}

export { groupRoutes };