import { Component, OnInit } from '@angular/core';
import { PrescripcionService } from '../api/prescripcion.service';
import { Prescripcion } from '../interfaces/prescripcion';
import { NavigationExtras, Router } from '@angular/router';
import { IpsService } from '../api/ips.service';
import { Ips } from '../interfaces/ips';

@Component({
  selector: 'app-prescripcion',
  templateUrl: './prescripcion.page.html',
  styleUrls: ['./prescripcion.page.scss'],
})
export class PrescripcionPage implements OnInit {

  prescripcion: Prescripcion;
  ips: Ips;
  itemprescripcion: any;
  itemmedicamentos: any;
  itemmedico: any;
  constructor(
    private PrescripcionService: PrescripcionService,
    private IpsService: IpsService,
    public router: Router
  ) { }

  async ngOnInit() {
    (await this.PrescripcionService.getPrescripcionUsuario(window.localStorage['idUsuario'])).subscribe(response => {
      this.prescripcion = response;
    });
  }

  openNavDetailsPage(item) {
    let navigateExtras: NavigationExtras = {
      queryParams: {
        itemprescripcion: JSON.stringify(item)
      }
    };

    this.router.navigate(['prescripcion-detalle'], navigateExtras);
  }
}
