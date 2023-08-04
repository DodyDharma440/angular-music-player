import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

type ModalOptions = {
  title?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<string>;
  element!: ModalComponent;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>, options?: ModalOptions) {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(ModalComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);

    this.element = modalComponent.instance;

    modalComponent.instance.title = options?.title;
    modalComponent.instance.isOpen = true;
    modalComponent.instance.onClose.subscribe(() => this.close());
    modalComponent.hostView.detectChanges();

    const portalRoot = this.document.getElementById('portal-root');
    portalRoot?.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier.asObservable();
  }

  close() {
    this.modalNotifier?.complete();
  }
}
