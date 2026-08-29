class Group {
    constructor(name, description, ageLimit, colorTheme, requestedByUserId) {
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.ageLimit = ageLimit;
        this.colorTheme = colorTheme;

        this.adminIds = [];
        this.memberIds = [];
        this.bannedUserIds = [];
    }
}

export { Group };