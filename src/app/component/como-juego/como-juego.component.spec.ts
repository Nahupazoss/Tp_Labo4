import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoJuegoComponent } from './como-juego.component';

describe('ComoJuegoComponent', () => {
  let component: ComoJuegoComponent;
  let fixture: ComponentFixture<ComoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoJuegoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
