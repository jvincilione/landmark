import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';

import * as moment from 'moment-mini';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  title: string;
  date: string;
  speaker: string;
  files: File[];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  onUpload(eve): void {
    if (eve.target && eve.target.files.length) {
      this.files = eve.target.files;
    }
  }

  addSermon(): void {
    if (this.validate()) {
      const formData = new FormData();
      for (const file of this.files) {
        formData.append('file[]', file, file.name);
      }
      formData.append('title', this.title);
      formData.append('date', this.speaker);
      formData.append('speaker', this.speaker);
      this.adminService.addSermon(formData)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  private validate(): boolean {
    const isValid = !!(this.title && this.date && this.speaker && this.files.length) &&
                    moment(this.date, 'YYYY-MM-DD', true).isValid();
    if (isValid === false) {
      this.showInvalidFieldMessage();
    }
    return isValid;
  }

  private showInvalidFieldMessage(): void {
    const invalidFields = [];
    if (!this.title) {
      invalidFields.push('The sermon title is required.');
    }
    if (!this.speaker) {
      invalidFields.push('The speaker\'s name is required.');
    }
    if (!this.files || !this.files.length) {
      invalidFields.push('The sermon mp3 file is required.');
    }
    if (!this.date) {
      invalidFields.push('The sermon date is required.');
    }
    if (this.date && !moment(this.date, 'YYYY-MM-DD', true).isValid()) {
      invalidFields.push('The sermon date must be in the format YYYY-MM-DD. IE: 2017-03-31');
    }
    for (const message of invalidFields) {
      this.toastr.error(message, 'Error');
    }
  }
}
