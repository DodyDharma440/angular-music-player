import { Component, Input } from '@angular/core';
import { compactNumber } from 'src/app/utils/number-format';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
})
export class ItemCardComponent {
  @Input('title') title = '';
  @Input('subtitle') subtitle = '';
  @Input('tracksCount') tracksCount?: number;
  @Input('trackLabel') trackLabel?: string = 'track';

  @Input('image') image = '';

  @Input('fullWidth') fullWidth = false;
  @Input('isDisabled') isDisabled?: boolean;

  formatCount() {
    return compactNumber(this.tracksCount);
    // return this.tracksCount;
  }
}
