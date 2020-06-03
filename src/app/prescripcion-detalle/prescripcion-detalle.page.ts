import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { Prescripcion } from '../interfaces/prescripcion';

@Component({
  selector: 'app-prescripcion-detalle',
  templateUrl: './prescripcion-detalle.page.html',
  styleUrls: ['./prescripcion-detalle.page.scss'],
})
export class PrescripcionDetallePage implements OnInit {
  dataPrescripcion: Prescripcion;
  usuario: Usuario;

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(
      params => {
        if (params && params.itemprescripcion) {
          this.dataPrescripcion = JSON.parse(params.itemprescripcion);
          //console.log("Prescripcion recibida: " + this.dataPrescripcion);
        }
      }
    )
  }

  async ngOnInit() {

  }

  buscarPrescripcion() {
    let navigateExtras: NavigationExtras = {
      queryParams: {
        itemprescripcion: JSON.stringify(this.dataPrescripcion)
      }
    };
    // console.log("prescripcion" + JSON.stringify(this.dataPrescripcion));
    this.router.navigate(['ubicacion'], navigateExtras);
  }
  buscarMedicamento(item) {
    let navigateExtras: NavigationExtras = {
      queryParams: {
        itemmedicamento: JSON.stringify(item),
        itemidprescripcion: this.dataPrescripcion.idprescripcion
      }
    };
    // console.log("medicamento" + JSON.stringify(item));
    this.router.navigate(['ubicacion'], navigateExtras);
  }

}
