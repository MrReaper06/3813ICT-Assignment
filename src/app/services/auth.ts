import { Service, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user"

@Service()
export class Auth {
    private http = inject(HttpClient);

    private _currentUser = signal<User | null>(this.loadFromStorage());
    currentUser = this._currentUser.asReadonly();
    isLoggedIn = computed(() => this._currentUser() !== null);

    private loadFromStorage(): User | null {
        const stored = localStorage.getItem("currentUser");
        return stored ? JSON.parse(stored): null;
    }

    login(email: string, password: string) {
        return this.http.post<any>("http://localhost:3000/api/auth", { email, password });
    }

    setCurrentUser(user: User) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this._currentUser.set(user);
    }

    logout() {
        localStorage.removeItem("currentUser");
        this._currentUser.set(null);
    }
}

