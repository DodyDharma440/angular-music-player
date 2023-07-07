import { ElementRef, Inject, Injectable, Optional } from '@angular/core';
import { IntersectionObserverHelper } from '../helpers/intersection.observer';

@Injectable({
  providedIn: 'root',
})
export class InfiniteScrollService {
  total = 0;

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

  initIntersection<T>(element: ElementRef<T> | null, onLoadMore: () => void) {
    this.intersection.createAndObserve(element!).subscribe((isIntersecting) => {
      if (isIntersecting) {
        onLoadMore();
      }
    });
  }

  getOffset(page: number) {
    return (page - 1) * this.perPage;
  }

  updatePage(value: number) {
    this.page = value;
  }

  updatePerPage(value: number) {
    this.perPage = value;
  }

  updateTotal(value: number) {
    this.total = value;
  }

  canNextPage(currentTotal: number) {
    return this.total > currentTotal;
  }
}
