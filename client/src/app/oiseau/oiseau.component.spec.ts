import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OiseauComponent } from './oiseau.component';

describe('OiseauComponent', () => {
  let component: OiseauComponent;
  let fixture: ComponentFixture<OiseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OiseauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OiseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
