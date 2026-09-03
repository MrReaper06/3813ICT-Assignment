import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { GroupServiceClass } from '../services/group';
import { Group } from '../models/group';

@Component({
  imports: [FormsModule],
  selector: 'app-request-channel',
  styleUrl: './request-channel.css',
  templateUrl: './request-channel.html',
})
export class RequestChannel implements OnInit {
  private auth = inject(Auth);
  private groupService = inject(GroupServiceClass);

  groups = signal<Group[]>([]);
  selectedGroupId = signal('');
  name = signal('');
  successMessage = signal('');

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => this.groups.set(groups));
  }

  submit() {
    const email = this.auth.currentUser()?.email;
    if (!email || !this.selectedGroupId()) return;

    this.groupService.requestChannel(this.selectedGroupId(), this.name(), email).subscribe({
      next: () => {
        this.successMessage.set('Channel request submitted.');
        this.name.set('');
      }
    });
  }
}
