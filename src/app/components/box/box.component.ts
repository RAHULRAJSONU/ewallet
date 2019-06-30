import { Component, OnInit, ContentChildren, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() boxTitle:string="Box";
  
  constructor() { }

  ngOnInit() {
  }

}
