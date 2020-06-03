import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrescripcionDetallePage } from './prescripcion-detalle.page';

describe('PrescripcionDetallePage', () => {
  let component: PrescripcionDetallePage;
  let fixture: ComponentFixture<PrescripcionDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescripcionDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrescripcionDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
