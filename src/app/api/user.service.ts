import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApi = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  getAllUser() {
    const path = `${this.urlApi}/users`;
    return this.http.get<User[]>(path);
  }

  getUser(user: string) {
    const path = `${this.urlApi}/users/${user}`;
    return this.http.get<User>(path);
  }
}
