import crypto from "node:crypto";

class GroupRequest {
    constructor(name, description, ageLimit, colorTheme, requestedByUserId) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.ageLimit = ageLimit;
        this.colourTheme = colorTheme;
        this.requestedByUserId = requestedByUserId;
        this.status = "pending"; // "pending" | "approved" | "rejected"
        this.rejectionReason = null;
    }
}

export { GroupRequest };