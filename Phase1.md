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

| Field | Data Type | Description |
| ----------- | ----------- | ----------- |
| username | string | Unique username registered by the user for the application. It will also be used as a display name |
| email | string | Unique email address registered by the user |
| password | string | User authentication credential |
| birthdate | string | Birthdate given by the user |
| age | number | Age given by the user |
| role | "user" | "groupAdmin" | "superAdmin" | Global role of the user |
| banned | boolean | System level permanent ban. The user will not be deleted and the date of the user will be stored |

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

| Field | Data Type | Description |
| ----------- | ----------- | ----------- |
| groupId | string | Unique group indentifier |
| name | string | Group name |
| description | string | Description of the group |
| ageLimit | number | Minimum age required to join the group |
| colorTheme | string | Color Theme to be applied to the group and it's channels |
| adminIds | string[] | Ids of the users who are group admin |
| memberIds | string[] | Ids of the users who are currently a member of the group |
| bannedUserIds | string[] | Ids of the users who are banned from the group |

## 4.3 Channel
```
class Channel {
    constructor(groupId, name, requestedByUserId) {
        this.channelId = channelId;
        this.groupId = groupId;
        this.name = name;
        this.requestedByUserId = requestedByUserId;

        this.status = "pending"; // "pending" | "approved" | "rejected"
        this.rejectedReason = null;
    }
}
```

| Field | Data Type | Description |
| ----------- | ----------- | ----------- |
| channelId | string | Unique channel indentifier |
| groupId | string | Unique group indentifier |
| name | string | channel name |
| requestedByUserId | string | Id of the user who requested the channel |
| status | "pending" \| "approved" \| "rejected" | Status of the group after the user requested for this channel |
| rejectedReason | string \| null | Rejection by the group admin **must** include a reason |

# 5. Angular Architecture
## 5.1 Components
| Component | Purpose |
|---|---|
| App (root) | It hosts the Navbar and the router-outlet. It was made to have no logic of its own. |
| Navbar | It is persistent across every route. It will reads Auth's signals to switch between the login and logout states. |
| Home | It is a static landing page describing the application. It will the first page loaded when the application is opened |
| Login | It has a form of email and password. It delegates the actual request to Auth.login() and then, it calls Auth.setCurrentUser() on success. |
| Register | It is the registration form. It will also calculates age from birthdate client-side. It does not auto-login but instead, redirects the user to Login page on success. |
| Dashboard | It is the landing page after login. It hosts Sidebar + a content area. |
| Sidebar | It will render buttons such as Groups/Request/Settings/Logout buttons. It will also reads Auth's currentUser role via a computed signal to conditionally insert a Group Settings or Super Admin Settings button above Request. |
| GroupSettings | Group admin panel: edit group details, member list (allowed/banned), promote/demote, group-level bans. |
| SuperAdminSettings | Super admin panel: full user list, group creation-request queue, group deletion-request queue, permanent-ban action. |
| AuditLog | Super admin's audit log view. |
| RequestForm | It is a shared form for a regular user to submit a group-creation. |
| Profile | View the user's profile and editing the user's own account details (all fields except email, per client spec). |
| GroupView | It will displays a group's channel list and, eventually, the live chat itself via Socket.IO. |
## 5.2 Services
| Service | Purpose |
|---|---|
| Auth | It holds the currentUser as a signal. It is the single source for auth state, shared app-wide. |
| GroupService | It wraps the /api/groups/* endpoints - fetching, requesting, approving/rejecting, editing. |
| ChannelService | It wraps the /api/groups/:id/channels/* endpoints. |
| UserService | It wraps /api/users and /api/users/:email/ban for the super admin's user management panel. |
| ChatService | It wraps socket.io-client, sendMessage()/getMessages() rather than components touching sockets directly. |
## 5.3 Models
| Model | Type | Fields |
|---|---|---|
| User | Interface | username, email, birthdate, age, role ('user' \| 'groupAdmin' \| 'superAdmin'), banned |
| Group | Interface | id, name, description, ageLimit, colourTheme, adminIds[], memberIds[], bannedUserIds[] |
| Channel | Interface | id, groupId, name, requestedByUserId, status ('pending' \| 'approved' \| 'rejected'), rejectionReason |

# 6. REST API
This section will be updated as the application is developed.