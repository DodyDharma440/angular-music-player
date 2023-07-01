import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { menuItems } from 'src/app/constants/page-layout.constant';

@Component({
  selector: 'nav[sidebar]',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() canRender: boolean = true;

  menus = menuItems;

  constructor(private router: Router) {}

  isMenuActive(path: string): boolean {
    return this.router.url.split('?')[0] === path;
  }
}
