import {Subscription} from 'rxjs';
import {UserConsumer} from './user.consumer';
import {User} from '../core/model/user';


export abstract class UserListener {
  user: User;
  userSubscription: Subscription;

  protected constructor(protected userConsumer: UserConsumer) {
    this.userSubscription = this.userConsumer.getUser().subscribe(user => {
      if (user === null) {
        return;
      }
      this.user = user;
    });
  }

  onUserUpdate() {}

  protected clearUser() {
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    this.user = undefined;
  }

}
