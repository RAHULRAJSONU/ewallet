import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Account } from '../domain/Account';
import { isObservable, Observable, throwError, of, BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';
import { Category } from '../domain/Category';
import { isArray } from 'util';
import { Ledger } from '../domain/Ledger';
import { exist, group, sortByMonthComparator } from '../utils/arrayUtils';
import { EXPENSE, INCOME } from '../config/appConstant';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    private accountCollection: AngularFirestoreCollection<Account>;
    accounts: Observable<Account[]>;
    account = new BehaviorSubject<any>({});
    private categoryCollection: AngularFirestoreCollection<Category>;
    categories: Observable<Category[]>;
    private ledgerCollection: AngularFirestoreCollection<Ledger>;
    ledgers: Observable<Ledger[]>;
    totalIncome = new BehaviorSubject<number>(0);
    totalExpense = new BehaviorSubject<number>(0);
    currentBalance = new BehaviorSubject<number>(0);
    groupedExpense = new BehaviorSubject<any>({});
    groupedCategory = new BehaviorSubject<any>({});
    groupedIncome = new BehaviorSubject<any>({});
    userId = 'HqaAA4otqYdSBKpuJB9sqlHVlfW2';

    constructor(private db: AngularFirestore) {
        this.refreshData();
    }

    refreshData() {
        this.getAccount();
        this.getAllAccount();
        this.getCategories();
        this.getLedger();
        this.getTotalIncome(new Date("01/01/2019").toDateString(), new Date().toDateString());
        this.getTotalExpense(new Date("01/01/2019").toDateString(), new Date().toDateString());
        this.groupedExpenseByMonth();
        this.groupedIncomeByMonth();
        this.groupedExpenseByCategory();
    }

    documentToDomainObject = _ => {
        const object = _.payload.doc.data();
        object.id = _.payload.doc.id;
        return object;
    }

    persistInitialCategories() {
        this.createCategory({ id: uuid.v4(), name: 'food', icon: 'cutlery' })
        this.createCategory({ id: uuid.v4(), name: 'transport', icon: 'taxi' })
        this.createCategory({ id: uuid.v4(), name: 'rent', icon: 'home' })
        this.createCategory({ id: uuid.v4(), name: 'book', icon: 'book' })
        this.createCategory({ id: uuid.v4(), name: 'cloth', icon: 'shopping-bag' })
        this.createCategory({ id: uuid.v4(), name: 'electricity', icon: 'plug' })
        this.createCategory({ id: uuid.v4(), name: 'water', icon: 'tint' })
        this.createCategory({ id: uuid.v4(), name: 'coaching', icon: 'graduation-cap' })
    }

    createAccount(account: Account) {
        if (!this.checkDuplicate(this.accounts, 'name', account.name)) {
            return this.db.collection('accounts').add(account);
        } else {
            return throwError(new Error('Oops!Duplicate Record Found.')).toPromise();
        }

    }

    createCategory(category: Category) {
        if (!this.checkDuplicate(this.categories, 'name', category.name)) {
            return this.db.collection('categories').add(category);
        } {
            return throwError(new Error('Oops!Duplicate Record Found.')).toPromise();
        }
    }

    createLedger(ledger: Ledger) {
        let oldBalance = 0;
        let acc: Account;
        const req = JSON.parse(JSON.stringify(this.addMetaData(ledger)));
        this.account.subscribe(ac => { oldBalance = ac.balance; acc = ac });
        this.db.collection('ledger').add(req).then(() => {
            this.updateAccountBalance(acc, req.amount, req.transType)
        });
    }

    updateAccountBalance(account: Account, amount: string, transType: string) {
        console.log('updating balance__', account);
        let newBalance = 0
        switch (transType) {
            case EXPENSE:
                newBalance = typeof account.balance === 'number' ? account.balance - parseInt(amount) : parseInt(account.balance) - parseInt(amount);
                break;
            case INCOME:
                newBalance = typeof account.balance === 'number' ? account.balance + parseInt(amount) : parseInt(account.balance) + parseInt(amount);
                break;
            default: break;
        }
        this.updateAccount(account.id, { balance: newBalance });
    }

    updateAccount(id: string, account: any) {
        console.log('updating account__id: ', id, ' account: ', account);
        let accountRef = this.db.collection('accounts').doc("/" + id);
        accountRef.update(account).then(data => { this.refreshData() });
    }

    getCategories() {
        this.categoryCollection = this.db.collection<Category>('categories');
        this.categories = this.categoryCollection.snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    getAccount() {
        let resp: Account[] = [];
        this.accountCollection = this.db.collection<Account>('accounts');
        this.accountCollection.ref.where("user", "==", this.userId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let obj = Object.assign(doc.data());
                    obj.id = doc.id;
                    resp.push(obj)
                });
                this.account.next(resp[0]);
            });
    }

    getAllAccount() {
        this.accountCollection = this.db.collection<Account>('accounts');
        this.accounts = this.accountCollection.snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    getLedger() {
        this.ledgerCollection = this.db.collection<Ledger>('ledger');
        this.ledgers = this.ledgerCollection.snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    checkDuplicate(collection, key, value) {
        console.log('checkDuplicate__', collection)
        if (isObservable(collection)) {
            collection.subscribe(data => {
                if (isArray(data)) {
                    return (exist(data, key, value));
                }
            })
        } {
            return true;
        }
    }

    getLoggedinUser() {
        return 'Rohit';
    }

    getLatestExpense() {
        var resp = []
        this.ledgerCollection.ref.where("transType", "==", "expense").limit(10).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                resp.push(doc.data());
            });
        });
        return of(resp);
    }

    getLatestIncome() {
        var resp = []
        this.ledgerCollection.ref.where("transType", "==", "income").limit(10).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                resp.push(doc.data());
            });
        });
        return of(resp);
    }

    getTotalIncome(fromDate: string = "Tue Jan 01 2019", toDate: string = new Date().toDateString()) {
        var amt = 0
        var resp = [];
        var inc = 0;
        this.ledgerCollection.ref.orderBy("timestamp")
            // .where("timestamp", ">=", fromDate)
            // .where("timestamp", "<=", toDate)
            .where("transType", "==", "income")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resp.push(doc.data());
                });
                console.log('income##_', resp)
            }).then(d => {
                inc = resp.reduce((sum, currentExp) => parseInt(sum) + parseInt(currentExp.amount), amt);
            }).then(() => this.totalIncome.next(inc))
    }

    getTotalExpense(fromDate: string = "Tue Jan 01 2019", toDate: string = new Date().toDateString()) {
        var amt = 0
        var resp = [];
        var exp = 0;
        this.ledgerCollection.ref
            // .where("timestamp", ">", fromDate)
            // .where("timestamp", "<=", toDate)
            .where("transType", "==", "expense")
            .orderBy("timestamp")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resp.push(doc.data());
                });
            }).then(d => {
                exp = resp.reduce((sum, currentExp) => parseInt(sum) + parseInt(currentExp.amount), amt);
            }).then(() => this.totalExpense.next(exp))
    }

    groupedExpenseByMonth() {
        var resp = [];
        var grouppedDate = {};
        this.ledgerCollection.ref.orderBy("timestamp")
            .where("transType", "==", "expense").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resp.push(doc.data());
                });
            }).then(() => {
                resp = resp.map(res => {
                    res.month = new Date(res.timestamp).toLocaleString('en-IN', { month: 'long' })
                    return res;
                }).sort(sortByMonthComparator);
            }).then(() => {
                grouppedDate = group(resp, 'month', 'amount');
            }).then(() => this.groupedExpense.next(grouppedDate));
    }

    groupedIncomeByMonth() {
        var resp = [];
        var grouppedDate = {};
        this.ledgerCollection.ref.orderBy("timestamp")
            .where("transType", "==", "income").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resp.push(doc.data());
                });
            }).then(() => {
                resp = resp.map(res => {
                    res.month = new Date(res.timestamp).toLocaleString('en-IN', { month: 'long' })
                    return res;
                }).sort(sortByMonthComparator)
            }).then(() => {
                grouppedDate = group(resp, 'month', 'amount');
            }).then(() => this.groupedIncome.next(grouppedDate));
    }

    groupedExpenseByCategory() {
        var resp = [];
        var grouppedCategory = {};
        this.ledgerCollection.ref.orderBy("category")
            .where("transType", "==", "expense").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resp.push(doc.data());
                });
            }).then(() => {
                console.log('cat resp__', resp)
                grouppedCategory = group(resp, 'category', 'amount');
            }).then(() => this.groupedCategory.next(grouppedCategory));
    }

    addMetaData(request: any) {
        // request.id = uuid.v4();
        request.account = 'Rohit';
        request.user = this.getLoggedinUser();
        request.timestamp = new Date().toDateString();
        return request;
    }
}