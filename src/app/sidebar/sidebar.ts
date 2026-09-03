import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  imports: [],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private auth = inject(Auth);
  private router = inject(Router);

  userRole = computed(() => this.auth.currentUser()?.role);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
