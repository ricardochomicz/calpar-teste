import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaApiComponent } from './busca-api.component';

describe('BuscaApiComponent', () => {
  let component: BuscaApiComponent;
  let fixture: ComponentFixture<BuscaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
