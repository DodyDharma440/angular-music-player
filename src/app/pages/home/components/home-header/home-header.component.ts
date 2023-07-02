import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'home-header',
  templateUrl: './home-header.component.html',
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
export class HomeHeaderComponent {
  @Input() user: User | null = null;
  isMenuOpen = false;
  isMenuClicked = false;

  constructor(private authService: AuthService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
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

  preventCloseOnClick() {
    this.isMenuClicked = true;
  }
}
