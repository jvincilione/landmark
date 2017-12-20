import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {
  user: any = {
    full_name: 'Default',
    position: 'N/A'
  };

  constructor(private http: HttpClient) { }

  public getSermons(): Observable<any> {
    return this.http.get('/api/sermons/sermon.php')
      .pipe(map(data => data));
  }

  public addSermon(sermon): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    const options = {
      headers
    };

    return this.http.post('/api/sermons/sermon.php', sermon, options)
      .pipe(map(data => data));
  }

  public deleteSermon(sermonId): Observable<any> {
    return this.http.delete('/api/sermons/sermon.php?id=' + sermonId)
      .pipe(map(data => data));
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post('/api/users/login.php', JSON.stringify({ username, password }))
      .pipe(map(data => data));
  }

  public logout(): Observable<any> {
    return this.http.get('/api/users/logout.php')
      .pipe(map(data => data));
  }

  public getUsers(): Observable<any> {
    return this.http.get('/api/users/user.php')
      .pipe(map(data => data));
  }

  public addUser(user): Observable<any> {
    return this.http.post('/api/users/user.php', JSON.stringify(user))
      .pipe(map(data => data));
  }

  public deleteUser(userId: number): Observable<any> {
    return this.http.delete('/api/users/user.php?id=' + userId)
      .pipe(map(data => data));
  }

  public getCookie(name): string | object {
    const match = document.cookie.match(RegExp('(?:^|;\\s*)' + this.escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }

  private escape(str: string): string {
    return str.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
  }

}
