import { Component, VERSION } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserList } from './store/user/user.reducer';

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

  public users$: Observable<string[]> = this.store.pipe(select(selectUserList));

  name = 'Angular ' + VERSION.major;
}
