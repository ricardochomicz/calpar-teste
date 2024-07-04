import {Routes} from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {UserListComponent} from "./components/pages/users/user-list/user-list.component";
import {AuthGuard} from "./auth.guard";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ContactListComponent} from "./components/pages/contacts/contact-list/contact-list.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contacts',
        component: ContactListComponent,
        canActivate: [AuthGuard]
    }
];
