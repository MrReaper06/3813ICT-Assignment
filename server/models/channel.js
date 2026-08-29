class Channel {
    constructor(groupId, name, requestedByUserId) {
        this.groupId = groupId;
        this.name = name;
        this.requestedByUserId = requestedByUserId;

        this.status = "pending"; // "pending" | "approved" | "rejected"
        this.rejectedReason = null;
    }
}