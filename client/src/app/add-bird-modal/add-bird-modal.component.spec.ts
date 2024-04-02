import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBirdModalComponent } from './add-bird-modal.component';

describe('AddBirdModalComponent', () => {
  let component: AddBirdModalComponent;
  let fixture: ComponentFixture<AddBirdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBirdModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBirdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
