import { Routes } from '@angular/router';
import { SermonComponent } from './sermon/sermon.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './sermon/add/add.component';
import { UsersComponent } from './users/users.component';
import { AddComponent as UserAddComponent } from './users/add/add.component';

export const adminRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sermon', component: SermonComponent },
  { path: 'sermon/add', component: AddComponent },
  { path: 'user', component: UsersComponent },
  { path: 'user/add', component: UserAddComponent },
  { path: '', redirectTo: 'sermon' }
];
