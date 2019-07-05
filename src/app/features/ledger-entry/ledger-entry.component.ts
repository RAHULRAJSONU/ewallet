import { Component, OnInit, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Category } from 'src/app/domain/Category';
import { ConfigService } from 'src/app/service/config.service';
import { Ledger } from 'src/app/domain/Ledger';
import { Subscription, interval } from 'rxjs';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-ledger-entry',
  templateUrl: './ledger-entry.component.html',
  styleUrls: ['./ledger-entry.component.css']
})
export class LedgerEntryComponent implements OnInit, OnDestroy {
  selectedCategory: string;
  selectedPayMode: string;
  selectedTransType: string;
  newLedgerEntryForm: FormGroup;
  _categorySubscription: Subscription;
  _configSubscription: Subscription;

  categoryList: Category[] = [];
  payModeList: any = [];
  transTypeList: any = [];
  @ViewChild('ledgerEntry',{static:false}) public ledgerEntryModal: ModalDirective;

  constructor(private firebaseService: FirebaseService, private configService: ConfigService) {
    this._categorySubscription = this.firebaseService.categories.subscribe(cat => this.categoryList = cat);
    this._configSubscription = this.configService.appSetting.subscribe(setting => {
      this.transTypeList = setting['transType'];
      this.payModeList = setting['payMode'];
    })
  }

  ngOnInit() {
    this.newLedgerEntryForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      payMode: new FormControl(null, Validators.required),
      transType: new FormControl(null, Validators.required)
    })
    // this.persistBulkData();
  }

  onDropdownSelect(event, entity) {    
    this[entity] = event;
  }

  onLedgerEntrySave() {
    var ledgerEntry = this.prepareLedgerEntryRequest(this.newLedgerEntryForm.getRawValue())
    this.firebaseService.createLedger(ledgerEntry,(res)=>{
      this.ledgerEntryModal.hide();
    });
  }

  persistBulkData(){
    const randomAmount = [200,300,400,500,600,700,800]
    setInterval(()=>{
      var request = new Ledger();
      // console.log('payMode___',this.payModeList)
      request.category = this.categoryList[Math.floor(Math.random()*(this.categoryList.length-1))].name;
      request.transType = this.transTypeList[Math.floor(Math.random()*(this.transTypeList.length-1))].name;
      request.payMode = this.payModeList[Math.floor(Math.random()*(this.payModeList.length-1))].name;
      request.description = "Some discription about transaction";  
      request.amount = Math.floor(Math.random()*randomAmount[Math.floor(Math.random()*(randomAmount.length-1))]);
      // console.log('request__',request)
      this.firebaseService.createLedger(request,(res)=>{
        this.ledgerEntryModal.hide();
      });
    },3000)
  }

  prepareLedgerEntryRequest(formData: any){
    var request = new Ledger();    
    request.category = formData['category'];
    request.transType = formData['transType'];
    request.payMode = formData['payMode'];
    request.description = formData['description'];  
    request.amount = formData['amount'];  
    return request;
  }

  onModalOpen(event){
  }

  onModalClose(event){
    this.newLedgerEntryForm.reset();
    this.resetSelectedData();
  }

  resetSelectedData(){
    this.selectedCategory = null;
    this.selectedPayMode = null;
    this.selectedTransType = null;
  }

  ngOnDestroy(){
    this._categorySubscription.unsubscribe();
    this._configSubscription.unsubscribe();
  }

}
