import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nav[sidebar]',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  menuItems = [
    { label: 'Home', icon: 'fa-solid fa-house', path: '/' },
    { label: 'Artists', icon: 'fa-solid fa-users', path: '/artists' },
    { label: 'Categories', icon: 'fa-solid fa-list', path: '/categories' },
  ];

  constructor(private router: Router) {}

  isMenuActive(path: string): boolean {
    return this.router.url.split('?')[0] === path;
  }
}
