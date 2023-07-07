import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-layout',
  templateUrl: './detail-layout.component.html',
})
export class DetailLayoutComponent {
  @Input('image') image: string = '';
  @Input('title') title: string = '';
  @Input('subtitle') subtitle: string = '';
}
