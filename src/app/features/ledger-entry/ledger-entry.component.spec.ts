import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerEntryComponent } from './ledger-entry.component';

describe('LedgerEntryComponent', () => {
  let component: LedgerEntryComponent;
  let fixture: ComponentFixture<LedgerEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
