import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridApontamentoComponent } from './grid-apontamento.component';

describe('GridApontamentoComponent', () => {
  let component: GridApontamentoComponent;
  let fixture: ComponentFixture<GridApontamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridApontamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridApontamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
