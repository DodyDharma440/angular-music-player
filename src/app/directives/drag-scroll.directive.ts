import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[draggableScroll]',
})
export class DragScrollDirective {
  mouseDown = false;
  startX = 0;
  scrollLeft = 0;

  @HostListener('mousedown', ['$event']) onMouseDown(e: MouseEvent) {
    this.startDragging(e);
  }
  @HostListener('mouseup') onMouseUp() {
    this.stopDragging();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.stopDragging();
  }
  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    this.moveEvent(e);
  }

  constructor(private el: ElementRef) {}

  startDragging(e: MouseEvent) {
    this.mouseDown = true;
    this.startX = e.pageX - this.el?.nativeElement.offsetLeft || 0;
    this.scrollLeft = this.el?.nativeElement.scrollLeft || 0;
  }

  stopDragging() {
    this.mouseDown = false;
  }

  moveEvent(e: MouseEvent) {
    e.preventDefault();
    if (this.mouseDown) {
      const x = e.pageX - this.el?.nativeElement.offsetLeft;
      const scroll = x - this.startX;
      this.el.nativeElement.scrollLeft = this.scrollLeft - scroll;
    }
  }
}
