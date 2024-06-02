import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessageComponent } from './message/message.component';
import { SinginComponent } from './singin/singin.component';

export const routes: Routes = [
    { path: '', component: ContactsComponent },
    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'singin', component: SinginComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'message', component: MessageComponent },
];