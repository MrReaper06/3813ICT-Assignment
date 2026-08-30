export interface Group {
    groupId: string;
    name: string;
    description: string;
    ageLimit: number;
    colorTheme: string;

    adminIds: string[];
    memberIds: string[];
    bannedUserIds: string[];
}
