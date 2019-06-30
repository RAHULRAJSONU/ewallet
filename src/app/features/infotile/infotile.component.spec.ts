import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotileComponent } from './infotile.component';

describe('InfotileComponent', () => {
  let component: InfotileComponent;
  let fixture: ComponentFixture<InfotileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfotileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfotileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
