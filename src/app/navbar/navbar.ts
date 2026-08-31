import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  auth = inject(Auth);
  private router = inject(Router);

  dropdownOpen = signal(false);

  toggleDropdown() {
    this.dropdownOpen.update(open => !open);
  }

  logout() {
    this.auth.logout();
    this.dropdownOpen.set(false);
    this.router.navigate(["/login"]);
  }
}
