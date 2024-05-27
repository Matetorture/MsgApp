import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
];