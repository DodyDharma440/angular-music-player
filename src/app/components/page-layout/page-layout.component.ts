import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUserDataAction } from 'src/app/actions/user.action';
import { menuItems } from 'src/app/constants/page-layout.constant';
import { State } from 'src/app/models/state.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'div[page-layout]',
  templateUrl: './page-layout.component.html',
})
export class PageLayoutComponent {
  menus = menuItems;
  isPlaying = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.userService.getUserData().subscribe((data) => {
        this.store.dispatch(GetUserDataAction({ payload: data as User }));
      });
      this.store
        .select((store) => store.song.player)
        .subscribe((data) => {
          this.isPlaying = data.isPlaying;
        });
    }
  }

  isCanRender() {
    const url = this.router.url.split('?')[0];
    return this.menus.some((item) => item.path === url);
  }
}
