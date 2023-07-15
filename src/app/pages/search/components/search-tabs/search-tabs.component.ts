import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { spotifyCategories } from 'src/app/constants/spotify.constant';
import { SpotifyCategory } from 'src/app/models/base.model';

@Component({
  selector: 'search-tabs',
  templateUrl: './search-tabs.component.html',
})
export class SearchTabsComponent {
  @Input('active') active: SpotifyCategory = 'track';
  @Output('onActivate') onActivate = new EventEmitter<SpotifyCategory>();

  categories = spotifyCategories;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  onActivateCategory(category: SpotifyCategory) {
    const queryParams = { type: category };

    this.onActivate.emit(category);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
