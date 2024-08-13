import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`).pipe(
      map((response: any) => {
        return {
          users: response.data,
          totalPages: response.total_pages
        };
      })
    );
  }

  getUser(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    }
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map((response: any) => response.data),
      catchError(() => of(null))
    );
  }
}
