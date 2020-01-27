import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = {
      users: []
    };

    this._users = new BehaviorSubject<User[]>([]);

  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<User[]>(usersUrl)
      .subscribe((data: any) => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
      }, (error) => {
        console.log('Failed to fetch users');
      });
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  userById(id: number) {
    return this.dataStore.users.find(x => x.id === id);
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolve(user);
    });
  }
}
