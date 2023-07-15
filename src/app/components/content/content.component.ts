import { Component, Input, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/models/state.model';
import { AuthService } from 'src/app/services/auth.service';
import { toggleMenu } from 'src/app/constants/animation.constant';
import { Router } from '@angular/router';
import { UpdateGlobalSearch } from 'src/app/actions/global-search.action';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  animations: [toggleMenu()],
})
export class ContentComponent {
  @Input() contentTitle: string = '';
  @Input() withSearch?: boolean = false;

  user$ = this.store.select((store) => store.user.userData);
  globalSearch$ = this.store.select((store) => store.globalSearch.value);

  isMenuOpen = false;
  isMenuClicked = false;

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private store: Store<RootState>,
    private location: Location,
    private router: Router
  ) {
    this.renderer.listen('window', 'click', () => {
      if (!this.isMenuClicked) {
        this.isMenuOpen = false;
      }
      this.isMenuClicked = false;
    });
  }

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.authService.logout();
  }

  onChangeSearch(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.store.dispatch(UpdateGlobalSearch({ payload: value }));
  }

  onBack() {
    this.location.back();
  }

  onSearch(input: HTMLInputElement) {
    this.router.navigate(['/search'], { queryParams: { q: input.value } });
  }

  preventCloseOnClick() {
    this.isMenuClicked = true;
  }
}
