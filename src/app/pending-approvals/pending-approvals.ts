import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupServiceClass } from '../services/group';
import { GroupRequest } from '../models/group-request';

@Component({
  imports: [FormsModule],
  selector: 'app-pending-approvals',
  styleUrl: './pending-approvals.css',
  templateUrl: './pending-approvals.html',
})
export class PendingApprovals implements OnInit {
  private groupService = inject(GroupServiceClass);

  requests = signal<GroupRequest[]>([]);
  rejectionReasons = signal<Record<string, string>>({});

  ngOnInit() {
    this.load();
  }

  private load() {
    this.groupService.getPendingRequests().subscribe(requests => this.requests.set(requests));
  }

  approve(id: string) {
    this.groupService.approveRequest(id).subscribe(() => this.load());
  }

  reject(id: string) {
    const reason = this.rejectionReasons()[id];
    if (!reason) return; // client spec: a reason is required

    this.groupService.rejectRequest(id, reason).subscribe(() => this.load());
  }

  updateReason(id: string, value: string) {
    this.rejectionReasons.update(reasons => ({ ...reasons, [id]: value }));
  }
}
