import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { GroupServiceClass } from '../services/group';
import { Group } from '../models/group';
import { Channel } from '../models/channel';
import { User } from '../models/user';

@Component({
  imports: [FormsModule],
  selector: 'app-group-settings',
  styleUrl: './group-settings.css',
  templateUrl: './group-settings.html',
})
export class GroupSettings implements OnInit {
  private auth = inject(Auth);
  private groupService = inject(GroupServiceClass);

  myGroups = signal<Group[]>([]);
  selectedGroupId = signal('');
  members = signal<User[]>([]);
  banned = signal<User[]>([]);
  pendingChannels = signal<Channel[]>([]);

  ngOnInit() {
    const email = this.auth.currentUser()?.email;
    if (!email) return;

    this.groupService.getMyGroups(email).subscribe(groups => {
      this.myGroups.set(groups);
      if (groups.length > 0) {
        this.selectGroup(groups[0].id);
      }
    });
  }

  selectGroup(groupId: string) {
    this.selectedGroupId.set(groupId);
    this.refreshMembers();
    this.refreshChannels();
  }

  private refreshMembers() {
    this.groupService.getMembers(this.selectedGroupId()).subscribe(data => {
      this.members.set(data.members);
      this.banned.set(data.banned);
    });
  }

  private refreshChannels() {
    this.groupService.getPendingChannels(this.selectedGroupId()).subscribe(
      channels => this.pendingChannels.set(channels)
    );
  }

  promote(email: string) {
    this.groupService.promote(this.selectedGroupId(), email).subscribe(() => this.refreshMembers());
  }

  demote(email: string) {
    this.groupService.demote(this.selectedGroupId(), email).subscribe(() => this.refreshMembers());
  }

  ban(email: string) {
    this.groupService.banMember(this.selectedGroupId(), email).subscribe(() => this.refreshMembers());
  }

  approveChannel(channelId: string) {
    this.groupService.approveChannel(this.selectedGroupId(), channelId).subscribe(() => this.refreshChannels());
  }

  rejectChannel(channelId: string, reason: string) {
    if (!reason) return;
    this.groupService.rejectChannel(this.selectedGroupId(), channelId, reason).subscribe(() => this.refreshChannels());
  }
}
