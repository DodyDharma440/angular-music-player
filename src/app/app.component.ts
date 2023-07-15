import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyJ') {
      this.onToggleTheme();
    }
  }

  currentTheme = 'light';

  ngOnInit(): void {
    this.currentTheme = localStorage['theme'] || 'light';
  }

  ngAfterViewInit(): void {
    if (this.currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onToggleTheme() {
    if (this.currentTheme === 'light') {
      this.currentTheme = 'dark';
      localStorage['theme'] = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      this.currentTheme = 'light';
      localStorage['theme'] = 'light';
      document.documentElement.classList.remove('dark');
    }
  }
}
