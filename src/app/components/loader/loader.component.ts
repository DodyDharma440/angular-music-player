import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit, OnChanges {
  @Input('isLoading') isLoading = false;
  @Input('error') error?: HttpErrorResponse;
  @Input('placeholderHeight') placeholderHeight = 300;
  @Input('customLoader') customLoader = false;

  @ViewChild('placeholder') placeholder: ElementRef<HTMLDivElement> | null =
    null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['placeholderHeight']) {
      this.setHeight();
    }
  }

  setHeight() {
    if (this.placeholder) {
      this.placeholder.nativeElement.style.height = `${this.placeholderHeight}px`;
    }
  }
}
