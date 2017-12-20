import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public logout(): void {
    this.adminService.logout()
      .subscribe((data) => {
        this.router.navigateByUrl('/admin/login');
      });
  }

}
