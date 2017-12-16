import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getSermons();
  }

  private getSermons(): void {
    this.appService.getSermons()
      .subscribe((sermons) => {
        console.log(sermons);
      });
  }

}
