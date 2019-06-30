import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Ledger } from 'src/app/domain/Ledger';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestExpense: Observable<any>;
  latestIncome: Observable<any>;
  ledger: Observable<any>;
  totalIncomeEmmiter$ = new BehaviorSubject<number>(0);
  totalExpenseEmmiter$ = new BehaviorSubject<number>(0);
  account$ = new BehaviorSubject<any>({});
  groupedExpense$ = new BehaviorSubject<any>({});
  groupedIncome$ = new BehaviorSubject<any>({});
  groupedExpenseCategory$ = new BehaviorSubject<any>({});

  constructor(private firebaseService: FirebaseService) { 
    this.latestExpense = this.firebaseService.getLatestExpense();
    this.latestIncome = this.firebaseService.getLatestIncome();
    this.ledger = this.firebaseService.ledgers;
    this.firebaseService.totalIncome.subscribe(val => this.totalIncomeEmmiter$.next(val));
    this.firebaseService.totalExpense.subscribe(val => this.totalExpenseEmmiter$.next(val));
    this.firebaseService.account.subscribe(ac=>this.account$.next(ac))
    this.firebaseService.groupedExpense.subscribe(ge=>this.groupedExpense$.next(ge));
    this.firebaseService.groupedIncome.subscribe(gi=>this.groupedIncome$.next(gi));
    this.firebaseService.groupedCategory.subscribe(gc=>this.groupedExpenseCategory$.next(gc));
  }

  ngOnInit() {
    this.groupedExpenseCategory$.subscribe(gc=>console.log('grouped category__',gc))
  }

}
