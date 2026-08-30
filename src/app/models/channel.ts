export interface Channel {
    channelId: string;
    groupId: string;
    name: string;
    requestedByUserId: string;

    status: "pending" | "approved" | "rejected";
    rejectedReason: string | null;
}
