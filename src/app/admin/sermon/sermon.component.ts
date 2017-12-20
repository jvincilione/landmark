import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sermon',
  templateUrl: './sermon.component.html',
  styleUrls: ['./sermon.component.scss']
})
export class SermonComponent implements OnInit {
  showConfirmationModal = false;
  sermonToDelete;
  sermons;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.validateLoggedIn()) {
      this.getSermons();
    } else {
      this.router.navigateByUrl('/admin/login');
    }
  }

  public showDeleteConfirmation(sermon): void {
    this.sermonToDelete = sermon;
    this.showConfirmationModal = true;
  }

  public cancelDelete(): void {
    this.sermonToDelete = undefined;
    this.showConfirmationModal = false;
  }

  public deleteSermon(): void {
    this.adminService.deleteSermon(this.sermonToDelete.kp_sermon)
      .subscribe(
        (data) => {
          this.toastr.success(this.sermonToDelete.title + ' deleted.', 'Success!');
          this.sermonToDelete = undefined;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private validateLoggedIn(): boolean {
    return !!(this.adminService.getCookie('lbc-guid') && this.adminService.getCookie('lbc-username'));
  }

  private getSermons(): void {
    this.adminService.getSermons()
      .subscribe((sermons) => {
        this.sermons = sermons.data;
      });
  }

}
