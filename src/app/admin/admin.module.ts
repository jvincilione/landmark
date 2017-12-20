import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SermonComponent } from './sermon/sermon.component';
import { AddComponent } from './sermon/add/add.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UsersComponent } from './users/users.component';
import { AddComponent as UserAddComponent } from './users/add/add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(adminRoutes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    NgxDatatableModule
  ],
  declarations: [
    SermonComponent,
    AddComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UsersComponent,
    UserAddComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
