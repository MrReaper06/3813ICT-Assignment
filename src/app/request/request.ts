import { Component, inject } from '@angular/core';
import { Auth } from '../services/auth';
import { RequestGroup } from '../request-group/request-group';
import { RequestChannel } from '../request-channel/request-channel';
import { MyRequests } from '../my-requests/my-requests';
import { PendingApprovals } from '../pending-approvals/pending-approvals';

@Component({
  imports: [RequestGroup, RequestChannel, MyRequests, PendingApprovals],
  selector: 'app-request',
  styleUrl: './request.css',
  templateUrl: './request.html',
})
export class Request {
  auth = inject(Auth);
}
