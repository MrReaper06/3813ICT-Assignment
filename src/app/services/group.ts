import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group';
import { Channel } from '../models/channel';
import { GroupRequest } from '../models/group-request';

const BASE = 'http://localhost:3000/api/groups';

@Service()
export class GroupServiceClass {
  private http = inject(HttpClient);

  requestGroup(name: string, description: string, ageLimit: number, colourTheme: string, requestedByUserId: string) {
    return this.http.post<any>(`${BASE}/request`, { name, description, ageLimit, colourTheme, requestedByUserId });
  }

  getMyRequests(email: string) {
    return this.http.get<GroupRequest[]>(`${BASE}/requests/mine`, { params: { email } });
  }

  getPendingRequests() {
    return this.http.get<GroupRequest[]>(`${BASE}/requests/pending`);
  }

  approveRequest(id: string) {
    return this.http.post<any>(`${BASE}/requests/${id}/approve`, {});
  }

  rejectRequest(id: string, reason: string) {
    return this.http.post<any>(`${BASE}/requests/${id}/reject`, { reason });
  }

  getGroups() {
    return this.http.get<Group[]>(BASE);
  }

  requestChannel(groupId: string, name: string, requestedByUserId: string) {
    return this.http.post<any>(`${BASE}/${groupId}/channels/request`, { name, requestedByUserId });
  }

  getPendingChannels(groupId: string) {
    return this.http.get<Channel[]>(`${BASE}/${groupId}/channels/pending`);
  }

  approveChannel(groupId: string, channelId: string) {
    return this.http.post<any>(`${BASE}/${groupId}/channels/${channelId}/approve`, {});
  }

  rejectChannel(groupId: string, channelId: string, reason: string) {
    return this.http.post<any>(`${BASE}/${groupId}/channels/${channelId}/reject`, { reason });
  }

    getMyGroups(email: string) {
    return this.http.get<Group[]>(`${BASE}/mine`, { params: { email } });
  }

  getMembers(groupId: string) {
    return this.http.get<{ members: any[]; banned: any[] }>(`${BASE}/${groupId}/members`);
  }

  promote(groupId: string, userEmail: string) {
    return this.http.post<any>(`${BASE}/${groupId}/promote`, { userEmail });
  }

  demote(groupId: string, userEmail: string) {
    return this.http.post<any>(`${BASE}/${groupId}/demote`, { userEmail });
  }

  banMember(groupId: string, userEmail: string) {
    return this.http.post<any>(`${BASE}/${groupId}/ban`, { userEmail });
  }
}
