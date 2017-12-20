import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];
  userToDelete;
  showConfirmationModal = false;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUsers();
  }


  public showDeleteConfirmation(user): void {
    this.userToDelete = user;
    this.showConfirmationModal = true;
  }

  public cancelDelete(): void {
    this.userToDelete = undefined;
    this.showConfirmationModal = false;
  }

  public deleteUser(): void {
    this.adminService.deleteUser(this.userToDelete.kp_user)
      .subscribe(
      (data) => {
        this.toastr.success(this.userToDelete.full_name + ' deleted.', 'Success!');
        this.userToDelete = undefined;
      },
      (error) => {
        console.log(error);
      }
      );
  }

  private getUsers(): void {
    this.adminService.getUsers()
      .subscribe(users => {
        this.users = users.data;
      });
  }

}
