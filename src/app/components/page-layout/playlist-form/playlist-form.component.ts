import { Component, ContentChild, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'playlist-form',
  templateUrl: './playlist-form.component.html',
})
export class PlaylistFormComponent {
  @Output('cancel') cancel = new EventEmitter();

  onCancel() {
    this.cancel.emit();
  }
}
