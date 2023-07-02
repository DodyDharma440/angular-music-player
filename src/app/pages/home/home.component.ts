import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { categories as _categories } from 'src/app/constants/home.constant';
import { State } from 'src/app/models/state.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories = _categories;
  activeCategory = _categories[0].value;
  user: User | null = null;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select((store) => store.user.userData)
      .subscribe((data) => {
        this.user = data;
      });
  }

  onChangeCategory(value: string): void {
    this.activeCategory = value;
  }

  isActive(value: string): boolean {
    return this.activeCategory === value;
  }
}
