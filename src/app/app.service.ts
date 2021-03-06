import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getSermons(): Observable<any> {
    return this.http.get('/api/sermons/sermon.php')
            .pipe(map(sermons => sermons));
  }

}
