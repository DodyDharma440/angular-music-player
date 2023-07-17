import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'artist-detail',
  templateUrl: './artist-detail.component.html',
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  routerSubs!: Subscription;
  artistSubs!: Subscription;
  albumSubs!: Subscription;

  artist: Artist | null = null;
  artistId: string = '';
  albums: Album[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private scrollService: InfiniteScrollService
  ) {}

  ngOnInit(): void {
    this.routerSubs = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.artistId = id;
      this.getArtist(id);
      this.getArtistAlbums(id, this.scrollService.page);
    });
  }

  ngAfterViewInit() {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.artistSubs.unsubscribe();
    this.routerSubs.unsubscribe();
    this.albumSubs.unsubscribe();
    this.scrollService.reset();
  }

  onLoadMore() {
    this.getArtistAlbums(this.artistId, this.scrollService.page + 1);
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(this.albums.length);
  }

  getArtist(id: string) {
    this.artistSubs = this.spotifyService.getArtist(id).subscribe((data) => {
      this.artist = data;
    });
  }

  getArtistAlbums(id: string, page: number) {
    this.scrollService.page = page;
    this.albumSubs = this.spotifyService
      .getArtistAlbums(id, this.scrollService.generateQueryParams(page))
      .pipe(
        map((data) => {
          this.scrollService.updateTotal(data.total);
          this.scrollService.canNext = Boolean(data.next && data.items.length);
          return mergeRemoveDuplicates(this.albums, data.items, 'id');
        })
      )
      .subscribe((data) => {
        this.albums = data;
      });
  }
}
