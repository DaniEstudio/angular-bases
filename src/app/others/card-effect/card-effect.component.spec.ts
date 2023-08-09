import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEffectComponent } from './card-effect.component';

describe('CardEffectComponent', () => {
  let component: CardEffectComponent;
  let fixture: ComponentFixture<CardEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardEffectComponent]
    });
    fixture = TestBed.createComponent(CardEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
