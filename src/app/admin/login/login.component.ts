import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  public login(): void {
    this.adminService.login(this.username, this.password)
      .subscribe(
        (user) => {
          this.adminService.user = user;
          this.toastr.success('', 'Success!');
          setTimeout(() => {
            this.router.navigateByUrl('/admin/sermon');
          }, 1500);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
