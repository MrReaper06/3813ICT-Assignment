import { Component, signal, inject, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { GroupServiceClass } from '../services/group';
import { GroupRequest } from '../models/group-request';

@Component({
  imports: [],
  selector: 'app-my-requests',
  styleUrl: './my-requests.css',
  templateUrl: './my-requests.html',
})
export class MyRequests implements OnInit {
  private auth = inject(Auth);
  private groupService = inject(GroupServiceClass);

  requests = signal<GroupRequest[]>([]);

  ngOnInit() {
    const email = this.auth.currentUser()?.email;
    if (!email) return;

    this.groupService.getMyRequests(email).subscribe(requests => this.requests.set(requests));
  }
}
