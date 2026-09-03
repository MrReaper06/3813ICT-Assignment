import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  email = signal("");
  password = signal("");
  errorMessage = signal("");

  login() {
    this.auth.login(this.email(), this.password()).subscribe({
      next: (data) => {
        if (data.valid) {
          this.errorMessage.set("");
          const { valid, ...user } = data;
          this.auth.setCurrentUser(user);
          this.router.navigate(["/dashboard"]);
        } else if (data.banned) {
          this.errorMessage.set("This account has been banned");
        } else {
          this.errorMessage.set("Credentials do not match");
        }
      },
      error: () => this.errorMessage.set("An error occured while trying to login.")
    });
  }
}
