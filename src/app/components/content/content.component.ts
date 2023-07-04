import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/models/state.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  animations: [
    trigger('toggleMenu', [
      state(
        'open',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          transform: 'scale(0.95)',
          opacity: 0,
        })
      ),
      transition('open => close', [animate('0.1s ease-out')]),
      transition('close => open', [animate('0.1s ease-in')]),
    ]),
  ],
})
export class ContentComponent {
  @Input() contentTitle: string = '';

  user: User | null = null;

  isMenuOpen = false;
  isMenuClicked = false;

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private store: Store<RootState>,
    private location: Location
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.isMenuClicked) {
        this.isMenuOpen = false;
      }
      this.isMenuClicked = false;
    });
  }

  ngOnInit(): void {
    this.store
      .select((store) => store.user.userData)
      .subscribe((data) => {
        this.user = data;
      });
  }

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.authService.logout();
  }

  onBack() {
    this.location.back();
  }

  preventCloseOnClick() {
    this.isMenuClicked = true;
  }
}
