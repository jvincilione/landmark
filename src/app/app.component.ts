import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAdmin = false;

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.router.events.subscribe((eve) => {
      if (this.location.path().indexOf('admin') > -1) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }
}
