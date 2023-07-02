import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/state.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select((store) => store.user.userData)
      .subscribe((data) => {
        this.user = data;
      });
  }
}
