import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Account } from '../../domain/Account';
import { Observable } from 'rxjs';
import { Ledger } from 'src/app/domain/Ledger';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

  @Input()gridObservable: Observable<any>;
  columns:any[]=[
    {key:'category',display:'CATEGORY'},
    {key:'payMode',display:'PAY-MODE'},
    {key:'transType',display:'TRANS-TYPE'},    
    {key:'account',display:'ACCOUNT'},
    {key:'timestamp',display:'TIMESTAMP'},
    {key:'amount',display:'AMOUNT'},
  ];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.gridObservable.subscribe(coll=>{
      // console.log('griddata__',coll)
    })
  }

}
