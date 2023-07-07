import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-layout',
  templateUrl: './detail-layout.component.html',
})
export class DetailLayoutComponent implements OnInit {
  @Input('image') image?: string;
  @Input('title') title: string = '';
  @Input('subtitle') subtitle: string = '';

  ngOnInit(): void {
    console.log(this.image);
  }
}
