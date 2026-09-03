import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private http = inject(HttpClient);
  private router = inject(Router);

  username = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  birthdate = signal('');
  errorMessage = signal('');

  register() {
    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('The passwords do not match.');
      return;
    }

    const age = this.calculateAge(this.birthdate());

    this.http.post<any>('http://localhost:3000/api/register', {
      username: this.username(),
      email: this.email(),
      password: this.password(),
      birthdate: this.birthdate(),
      age
    }).subscribe({
      next: (data) => {
        if (data.ok) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage.set(data.message || 'Registration failed.');
        }
      },
      error: () => this.errorMessage.set('An error occurred while registering.')
    });
  }

  private calculateAge(birthdate: string): number {
    if (!birthdate) return 0;

    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }
}

