import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menuItems } from 'src/app/constants/page-layout.constant';

@Component({
  selector: 'div[page-layout]',
  templateUrl: './page-layout.component.html',
})
export class PageLayoutComponent {
  menus = menuItems;

  constructor(private router: Router) {}

  isCanRender() {
    const url = this.router.url.split('?')[0];
    return this.menus.some((item) => item.path === url);
  }
}
