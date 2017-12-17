import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Sermon } from './sermon.interface';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit {
  sermons: Sermon[];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getSermons();
  }

  public getDownloadUrl(url: string): string {
    if (url.indexOf('../') === 0) {
      return url.split('..')[1];
    } else {
      return url;
    }
  }

  private getSermons(): void {
    this.appService.getSermons()
      .subscribe((response) => {
        this.sermons = response.data;
      });
  }

}
