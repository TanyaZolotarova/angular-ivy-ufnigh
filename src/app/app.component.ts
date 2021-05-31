import { Component, VERSION } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {UserState} from './store/reducers/user.reducer';
import {selectUser} from './store/selectors/user.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.subscribe(data => console.log(data));
    this.users$.subscribe(data => {
      console.log('Some data');
      console.log(data);
    });
  }

  public users$: Observable<UserState> = this.store.pipe(select(selectUser));

  name = 'Angular ' + VERSION.major;
}
