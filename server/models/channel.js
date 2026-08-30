class Channel {
    constructor(channelId, groupId, name, requestedByUserId) {
        this.channelId = channelId;
        this.groupId = groupId;
        this.name = name;
        this.requestedByUserId = requestedByUserId;

        this.status = "pending"; // "pending" | "approved" | "rejected"
        this.rejectedReason = null;
    }
}