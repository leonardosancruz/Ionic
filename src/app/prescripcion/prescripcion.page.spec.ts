import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrescripcionPage } from './prescripcion.page';

describe('PrescripcionPage', () => {
  let component: PrescripcionPage;
  let fixture: ComponentFixture<PrescripcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescripcionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrescripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
