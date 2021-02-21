import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {User} from '../logged-in/user';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private USER_STORAGE_KEY = 'USER_STRG';
  private userUpdater: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private  storage: Storage) {
    this.fetchLocalStorageUser().then((user: User) => {
      this.userUpdater.next(user);
    });
  }

  store(user: User): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.storage.set(this.USER_STORAGE_KEY, JSON.stringify(user));
        this.userUpdater.next(user);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  fetch(): BehaviorSubject<User> {
    return this.userUpdater;
  }

  private async fetchLocalStorageUser(): Promise<User> {
    return JSON.parse(await this.storage.get(this.USER_STORAGE_KEY));
  }
}
