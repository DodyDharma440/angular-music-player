import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'home-header',
  templateUrl: './home-header.component.html',
})
export class HomeHeaderComponent {
  @Input() user: User | null = null;
}
