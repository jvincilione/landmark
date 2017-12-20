import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  public addSermon(sermon): Observable<any> {
    return this.http.post('/api/sermon.php', JSON.stringify(sermon))
      .pipe(map(data => data));
  }

  public deleteSermon(sermonId): Observable<any> {
    return this.http.delete('/api/sermon.php?id=' + sermonId)
      .pipe(map(data => data));
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/login.php', JSON.stringify({ username, password }))
      .pipe(map(data => data));
  }

  public setCookie(name, val): void {
    let expires = '';
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + val + expires + '; path=/';
  }

  public getCookie(name): string | object {
    const match = document.cookie.match(RegExp('(?:^|;\\s*)' + this.escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }

  private escape(str: string): string {
    return str.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
  }

}
