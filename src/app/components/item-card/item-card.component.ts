import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
})
export class ItemCardComponent {
  @Input('title') title = '';
  @Input('subtitle') subtitle = '';
  @Input('tracksCount') tracksCount?: number;
  @Input('image') image = '';

  @Input('fullWidth') fullWidth = false;
}
