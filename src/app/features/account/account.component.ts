import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

}

