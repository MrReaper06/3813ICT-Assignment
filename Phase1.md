# Full Stack Chat Application - Phase 1

**Student Name:** *Tasnim Haque*  
**S Number:** *S5350373*  
**Workshop:** *Friday, 2pm - 4pm*  
Course: 3813ICT - Full Stack Development  
Phase: Phase 1 - Elicitation of requirements, planning, design and early prototype

# 1. Project Overview
## 1.1 Introduction
This project is a full stack chat application made to allow users to chat and send media between users. This application will feature direct messages, groups and channel communication. It will also provide different levels of functionality according to the respective user's permission. The name of the application is REAPER (Acronym for Real-time, Engagement and Accessible Platform for Everyday Rapport). This application will be developed using the MEAN stack and socket.io for real-time communication.

The chat application has three permission levels:
1. User
2. Group Admin
3. Super Admin

## 1.2 Project Objectives
These are the main objectives of the application:
- Allow users to communicate through text messages and send images
- Provide basic authentication for the users
- Allow one user to join multiple groups
- Provide group admins with the necessary tools to manage their respective group
- Provide Super admin with the necessary tools to manage system level functionality
- Provide a functional and responsive user interface

## 1.3 Scope of Phase 1
This application is an early prototype. The prototype will demonstrate:
- A website home page
- Login and Logout
- Basic Authentication
- A dashboard after login (Chat Home page)
- Permission based access
- Group Admin interaface (For Group Admins only)
- Super Admin interface (For Super Admin only)
- Local storage of the current logged-in user

# 2. Git Strategy
## 2.1 The Repository
Git will be used for this application to provide version control and also to demonstrate the progression of the application.
This repository will be maintained in the GitHub and the professor will be added as a collaborator.
The documentation for phase 1 will be stored as Phase1.md

## 2.3 Branching Strategy
There will be 2 branches:
- main
- dev

The main branch will contain the stable version of the application and the dev branch will be used to develop and work on adding new features and functionalities. Once a new feature is added and is stable, the dev branch will be merged with the main branch to update the stable version.

# 3. Requirement Elicitation
## 3.1 User Permissions
### User
A normal user is able to:
- Register an account
- Login and Logout
- Edit and update their profile
- View available groups and request to join them
- Access the channels within the groups, they are member of

### Group Admin
A group admin has the same permissions as a normal user and in addition, A group admin is able to:
- Edit the group's settings (Name, Description, Age requirement, etc)
- Create and edit channels
- Ban user from the group
- Promote a user to group admin
- Demote a group admin to user

### Super Admin
There is only one Super Admin. A super admin has the same permissions as a group admin and in addition, a super admin is able to:
- Process group requests

# 4. Data Structures
## 4.1 User
```
class User {
    constructor(username, email, password, birthdate, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.age = age;
        this.role = "user";
        this.banned = false;
    }
}
```

| Field | Description |
| ----------- | ----------- |
| username | Unique username registered by the user for the application. It will also be used as a display name |
| email | Unique email address registered by the user |
| password | User authentication credential |
| birthdate | Birthdate given by the user |
| age | Age given by the user |
| role | Global role of the user |
| banned | System level permanent ban. The user will not be deleted and the date of the user will be stored |

## 4.2 Group
```
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
```

| Field | Description |
| ----------- | ----------- |
| groupId | Unique group indentifier |
| name | Group name |
| description | Description of the group |
| ageLimit | Minimum age required to join the group |
| colorTheme | Color Theme to be applied to the group and it's channels |
| adminIds | Ids of the users who are group admin |
| memberIds | Ids of the users who are currently a member of the group |
| bannedUserIds | Ids of the users who are banned from the group |

## 4.3 Channel
```
class Channel {
    constructor(groupId, name, requestedByUserId) {
        this.groupId = groupId;
        this.name = name;
        this.requestedByUserId = requestedByUserId;

        this.status = "pending"; // "pending" | "approved" | "rejected"
        this.rejectedReason = null;
    }
}
```

| Field | Description |
| ----------- | ----------- |
| groupId | Unique group indentifier |
| name | channel name |
| requestedByUserId | Id of the user who requested the channel |
| status | Status of the group after the user requested for this channel |
| rejectedReason | Rejection by the group admin **must** include a reason |

# 5. Angular Architecture
## 5.1 Components
This section will be updated as the application is developed.
## 5.2 Services
This section will be updated as the application is developed.
## 5.3 Models
This section will be updated as the application is developed.

# 6. REST API
This section will be updated as the application is developed.