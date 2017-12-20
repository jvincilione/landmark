import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSermonCollapsed = false;
  isUserCollapsed = false;
  user;

  constructor(private adminService: AdminService ) { }

  ngOnInit() {
    this.user = this.adminService.user;
  }

}
