import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  fadeModal,
  modalAnimation,
} from 'src/app/constants/animation.constant';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {
  @Input('isOpen') isOpen = false;
  @Input('title') title? = 'Modal Title';
  @Output('onClose') onClose = new EventEmitter();

  @ViewChild('modalBody') modalBody!: ElementRef<HTMLDivElement>;
  @ViewChild('modalOverlay') modalOverlay!: ElementRef<HTMLDivElement>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.modalBody.nativeElement.classList.add(modalAnimation.in.body);
    this.modalOverlay.nativeElement.classList.add(modalAnimation.in.overlay);
  }

  close() {
    this.modalBody.nativeElement.classList.remove(modalAnimation.in.body);
    this.modalBody.nativeElement.classList.add(modalAnimation.out.body);
    this.modalOverlay.nativeElement.classList.remove(modalAnimation.in.overlay);
    this.modalOverlay.nativeElement.classList.add(modalAnimation.out.overlay);

    setTimeout(() => {
      this.elementRef.nativeElement.remove();
      this.onClose.emit();
    }, 200);
  }
}
