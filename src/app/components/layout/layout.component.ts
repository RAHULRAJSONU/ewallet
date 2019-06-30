import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  sideBarActive:string = "sidenav"

  constructor() { }

  ngOnInit() {
  }

  toggleClassName(className) {
    if (this.sideBarActive === 'sidenav active') {
      this.sideBarActive = 'sidenav';
    } else{
      this.sideBarActive = 'sidenav active';
    }
  } 

}
