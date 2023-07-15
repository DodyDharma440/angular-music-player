import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'artist-item',
  templateUrl: './artist-item.component.html',
})
export class ArtistItemComponent {
  @Input('artist') artist: Artist | null = null;
}
