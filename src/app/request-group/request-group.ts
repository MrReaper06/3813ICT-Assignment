import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { GroupServiceClass } from '../services/group';

@Component({
  imports: [FormsModule],
  selector: 'app-request-group',
  styleUrl: './request-group.css',
  templateUrl: './request-group.html',
})
export class RequestGroup {
  private auth = inject(Auth);
  private groupService = inject(GroupServiceClass);

  name = signal('');
  description = signal('');
  ageLimit = signal(0);
  colourTheme = signal('#0d6efd');
  successMessage = signal('');

  submit() {
    const email = this.auth.currentUser()?.email;
    if (!email) return;

    this.groupService.requestGroup(
      this.name(), this.description(), this.ageLimit(), this.colourTheme(), email
    ).subscribe({
      next: () => {
        this.successMessage.set('Group request submitted.');
        this.name.set('');
        this.description.set('');
        this.ageLimit.set(0);
      }
    });
  }
}
