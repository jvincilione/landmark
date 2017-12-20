import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  name: string;
  position: string;
  username: string;
  password: string;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  public addUser(): void {
    const user = {
      username: this.username,
      fullName: this.name,
      password: this.password,
      position: this.position
    };
    if (this.validate()) {
      this.adminService.addUser(user)
        .subscribe(response => {
          this.clearForm();
          this.toastr.success('User ' + user.fullName + ' added.', 'Success!');
        });
    }
  }

  private clearForm(): void {
    this.name = '';
    this.position = '';
    this.username = '';
    this.password = '';
  }

  private validate(): boolean {
    const isValid = !!(this.name && this.username && this.position && this.password);
    if (isValid === false) {
      this.showInvalidFieldMessage();
    }
    return isValid;
  }

  private showInvalidFieldMessage(): void {
    const invalidFields = [];
    if (!this.username) {
      invalidFields.push('The user\'s username is required.');
    }
    if (!this.name) {
      invalidFields.push('The user\'s name is required.');
    }
    if (!this.position) {
      invalidFields.push('The user\'s position is required.');
    }
    if (!this.password) {
      invalidFields.push('The user\'s pass phrase is required.');
    }
    for (const message of invalidFields) {
      this.toastr.error(message, 'Error');
    }
  }

}
