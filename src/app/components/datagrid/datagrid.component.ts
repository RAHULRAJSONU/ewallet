import { Component, OnInit, Input } from '@angular/core';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {

  @Input()collection:any;
  @Input()columns:any[];
  data:any=[];

  constructor() { }

  ngOnInit() {
    if(isObservable(this.collection)){
      this.collection.subscribe(d =>{
        this.data=d;
      })
    }
  }

}
