import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SermonComponent } from './sermon/sermon.component';
import { AddComponent } from './sermon/add/add.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SermonComponent, AddComponent, LoginComponent, AdminComponent],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
