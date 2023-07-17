import {
  ElementRef,
  Inject,
  Injectable,
  OnDestroy,
  Optional,
} from '@angular/core';
import { IntersectionObserverHelper } from '../helpers/intersection.observer';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfiniteScrollService {
  total = 0;
  canNext = true;
  interSubs!: Subscription;

  constructor(
    private intersection: IntersectionObserverHelper,
    @Inject('page')
    @Optional()
    public page: number,
    @Inject('perPage')
    @Optional()
    public perPage: number
  ) {
    this.page = page || 1;
    this.perPage = perPage || 10;
  }

  reset(interClear: boolean = true) {
    this.page = 1;
    this.perPage = 10;
    this.total = 0;
    if (interClear) {
      this.clearIntersection();
    }
  }

  initIntersection<T>(element: ElementRef<T> | null, onLoadMore: () => void) {
    this.interSubs = this.intersection
      .createAndObserve(element!)
      .subscribe((isIntersecting) => {
        if (isIntersecting) {
          onLoadMore();
        }
      });
  }

  clearIntersection() {
    this.interSubs.unsubscribe();
  }

  generateQueryParams(page: number) {
    const offset = this.getOffset(page);

    const params = new URLSearchParams();
    params.append('offset', `${offset}`);
    params.append('limit', `${this.perPage}`);

    return params.toString();
  }

  getOffset(page: number) {
    return (page - 1) * this.perPage;
  }

  updateTotal(value: number) {
    if (!this.total) this.total = value;
  }

  canNextPage(currentTotal: number) {
    return this.canNext && this.total > currentTotal;
  }
}
