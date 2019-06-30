import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent implements OnInit {

  @Input() icon: string="money"
  @Input() boxTitle: string;
  @Input() boxVal: string;
  @Input() bottomTitle: string;
  @Input() bottomVal: string;
  @Input() boxColor: string = "bg-aqua";
  iconBoxColor:string = "info-box-icon"

  constructor() { }

  ngOnInit() {
      this.iconBoxColor = this.iconBoxColor+' '+this.boxColor;
  }

}
