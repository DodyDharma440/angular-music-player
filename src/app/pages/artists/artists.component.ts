import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/state.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
})
export class ArtistsComponent {
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
