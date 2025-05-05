import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApontamentoCompletoComponent } from './apontamento-completo.component';

describe('ApontamentoCompletoComponent', () => {
  let component: ApontamentoCompletoComponent;
  let fixture: ComponentFixture<ApontamentoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApontamentoCompletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApontamentoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
