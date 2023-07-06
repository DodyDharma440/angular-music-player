import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-layout',
  templateUrl: './detail-layout.component.html',
})
export class DetailLayoutComponent {
  private _image = '';
  @Input('image')
  set image(value: string) {
    this._image = value;
  }
  get image() {
    return this._image;
  }

  @Input('title') title: string = '';
  @Input('subtitle') subtitle: string = '';
}
