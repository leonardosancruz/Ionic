import { Component, OnInit, ViewChild } from '@angular/core';
import { Medicamento } from '../interfaces/medicamento';
import { MedicamentoService } from '../api/medicamento.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Geolocation } from '@ionic-native/geolocation/ngx/';
import { LatLng } from '@ionic-native/google-maps';
import { BusquedaService } from '../api/busqueda.service';
import { Divipola } from '../interfaces/divipola';
import { Farmacia } from '../interfaces/farmacia';

declare var google;

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.page.html',
  styleUrls: ['./medicamento.page.scss'],
})

export class MedicamentoPage implements OnInit {

  medicamentos: Medicamento;
  farmacia: Farmacia[];

  latitud: number;
  longitud: number;

  divipola: Divipola;

  mapa: any;
  ngUsuario = {};
  jsonUsuario: any;

  mensajeError: string;

  constructor(
    private MedicamentoService: MedicamentoService,
    private BusquedaService: BusquedaService,
    private geolocation: Geolocation
  ) {

  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  async ngOnInit() {
    (await this.MedicamentoService.getAll()).subscribe(medicamentos => {
      this.medicamentos = medicamentos;

      this.geolocation.getCurrentPosition().then(async response => {
        this.latitud = response.coords.latitude;
        this.longitud = response.coords.longitude;

        window.localStorage['lat'] = this.latitud;
        window.localStorage['lng'] = this.longitud;
        (await this.BusquedaService.getBusquedaCiudadDivipola(this.latitud, this.longitud)).subscribe(async responseGeocode => {
          this.divipola = responseGeocode; console.log("divipola: " + this.divipola);
        });
      }).catch(error => {
        console.log(error);
      });

    });

  }

  async cargarMapa() {
    console.log("------Cargar Mapa");

    let mapEle: HTMLElement = document.getElementById('map');
    let myLatLng = { lat: this.latitud, lng: this.longitud };

    this.mapa = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 11
    });

    google.maps.event.addListenerOnce(this.mapa, 'idle', () => {
      this.miUbicacion();
      this.cargarFarmacias();
      mapEle.classList.add('show-map');
    });

  }

  miUbicacion() {

    let icon = {
      url: 'assets/icon/icon-home.png', // image url
      scaledSize: new google.maps.Size(30, 30), // scaled size
    };

    let infoWindowContent =
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3>Mi Ubicación</h3>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    let marker = new google.maps.Marker({
      position: { lat: this.latitud, lng: this.longitud },
      animation: google.maps.Animation.DROP,
      map: this.mapa,
      icon: icon,
      title: "Mi ubicación"
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(this.map, marker);
    });
  }

  async cargarFarmacias() {
    this.mensajeError = "";

    this.jsonUsuario = this.ngUsuario;
    if (this.jsonUsuario.cantidad != undefined && this.jsonUsuario.medicamento.idmedicamento != undefined) {
      (await this.BusquedaService.getBusquedaFarmaciasMedicamento(
        this.jsonUsuario.medicamento.idmedicamento, this.divipola.osmtags.divipola, this.jsonUsuario.cantidad)).subscribe(
          response => {
            this.farmacia = response;
            this.renderMarkers(this.mapa);
          });
    } else {
      if (this.jsonUsuario.medicamento.idmedicamento != undefined) {
        this.mensajeError = "Debe Seleccionar Un Medicamento.";
      }
      if (this.jsonUsuario.cantidad != undefined) {
        this.mensajeError = "Debe Ingresar La Cantidad.";
      }
    }
  }

  renderMarkers(mapa) {

    // console.log("Medicamentos: " + this.medicamentos);
    // console.log("latitud: " + this.latitud);
    // console.log("longitud: " + this.longitud);
    // console.log("divipola: " + JSON.stringify(this.divipola));
    // console.log("formulario: " + JSON.stringify(this.ngUsuario));
    // console.log("Farmacia: " + JSON.stringify(this.farmacia));

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    this.farmacia.forEach(farmacia => {

      var evalua = true;
      farmacia.farmacia.medicamentoBusqueda.forEach(element => {
        console.log(element.disponible);
        if (!element.disponible) {
          evalua = false;
        }
      });

      farmacia.farmacia.medicamentoBusqueda.forEach(element => {
        if (evalua) {
          var infoWindowContent =
            '<h5 id="firstHeading" class="firstHeading">' + farmacia.farmacia.razonsocial + '</h5>' +
            '<b>Dirección: </b> ' + farmacia.farmacia.direccion + ', </br>' +
            '<b>Telefono: </b>' + farmacia.farmacia.telefono + ', </br>';

          infoWindowContent += '<b>Medicamento: </b>' + element.datosMedicamento.descripcioncliente + '</br>';

          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });

          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'address': farmacia.farmacia.direccion + ", " + farmacia.farmacia.ciudad.descripcion + ", " + farmacia.farmacia.departamento.descripcion }, function (results, status) {
            if (status === 'OK') {
              let temp = results[0].geometry.location.toString().replace('(', '').replace(')', '').split(',');

              var marker = new google.maps.Marker({
                position: new LatLng(Number.parseFloat(temp[0]), Number.parseFloat(temp[1])),
                draggable: true,
                animation: google.maps.Animation.DROP,
                map: mapa,
                title: farmacia.farmacia.razonsocial
              });

              google.maps.event.addListener(marker, 'click', function (evt) {

                let origin = { lat: Number.parseFloat(window.localStorage['lat']), lng: Number.parseFloat(window.localStorage['lng']) };
                let destination = { lat: Number.parseFloat(evt.latLng.lat().toFixed(3)), lng: Number.parseFloat(evt.latLng.lng().toFixed(3)) };

                infoWindow.open(mapa, marker);

                directionsService.route({
                  origin: origin,
                  destination: destination,
                  travelMode: google.maps.TravelMode.DRIVING
                }, (response, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                  } else {
                    alert('Could not display directions due to: ' + status);
                  }
                });

                directionsRenderer.setMap(mapa);
              });
            }
            else {
              console.log("salio");
            }
          });
        }
      });
    });
  }
}
