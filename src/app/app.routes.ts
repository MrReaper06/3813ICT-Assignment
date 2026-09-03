import { Routes } from '@angular/router';
import { Home } from "./home/home";
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth-guard';
import { Request } from './request/request';

export const routes: Routes = [
    { path: "", component: Home, title: "Home" },
    { path: "login", component: Login, title: "Login" },
    { path: 'register', component: Register, title: 'Register' },
    { path: 'dashboard', component: Dashboard, title: 'Dashboard', canActivate: [authGuard] },
    { path: 'request', component: Request, title: 'Requests', canActivate: [authGuard] }
];
