import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
})
export class AlbumCardComponent implements OnInit {
  @Input() album: Album | null = null;
  artistNames = '';

  ngOnInit(): void {
    this.artistNames = this.album?.artists.map((a) => a.name).join(', ') || '';
  }

  isMoreThanOne(total?: number) {
    return (total || 0) > 1;
  }
}
