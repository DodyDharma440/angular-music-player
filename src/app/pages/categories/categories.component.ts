import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  categoriesSubs!: Subscription;
  categories: Category[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private scrollService: InfiniteScrollService
  ) {}

  ngOnInit(): void {
    this.getCategories(this.scrollService.page);
  }

  ngOnDestroy(): void {
    this.categoriesSubs.unsubscribe();
    this.scrollService.reset();
  }

  ngAfterViewInit(): void {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  onLoadMore() {
    this.getCategories(this.scrollService.page + 1);
  }

  getCategories(page: number) {
    this.scrollService.page = page;
    this.categoriesSubs = this.spotifyService
      .getCategories(this.scrollService.generateQueryParams(page))
      .pipe(
        tap((res) => this.scrollService.updateTotal(res.categories.total)),
        map((res) =>
          mergeRemoveDuplicates(this.categories, res.categories.items, 'id')
        )
      )
      .subscribe((data) => {
        this.categories = data;
      });
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(this.categories.length);
  }
}
