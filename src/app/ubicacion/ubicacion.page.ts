import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../api/busqueda.service';
import { Farmacia } from '../interfaces/farmacia';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx/';
import { Divipola } from '../interfaces/divipola';
import { LatLng } from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {

  farmacia: Farmacia[];
  dataPrescripcion: any;
  dataMedicamento: any;
  idPrescripcion: any;
  map: any;
  divipola: Divipola;
  latitude: number;
  longitude: number;
  position: {
    lat: number,
    lng: number
  };

  constructor(
    private BusquedaService: BusquedaService,
    private route: ActivatedRoute,
    private geolocation: Geolocation
  ) {
    this.route.queryParams.subscribe(
      params => {
        if (params && params.itemprescripcion || params.itemmedicamento) {
          if (params.itemmedicamento != undefined) {
            this.dataMedicamento = JSON.parse(params.itemmedicamento);
            this.idPrescripcion = params.itemidprescripcion;
            window.localStorage['idPrescripcion'] = this.idPrescripcion
            // console.log("id" + this.idPrescripcion)
            // console.log("medi" + JSON.stringify(this.dataMedicamento));
          } else {
            this.dataPrescripcion = JSON.parse(params.itemprescripcion);
            // console.log("pres" + JSON.stringify(this.dataPrescripcion));
          }
        }
      }
    )
  }

  async ngOnInit() {
    this.geolocation.getCurrentPosition().then(async response => {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;

      window.localStorage['lat'] = this.latitude;
      window.localStorage['lng'] = this.longitude;

      this.cargar();
    }).catch(error => {
      console.log(error);
    });
  }

  async cargar() {
    (await this.BusquedaService.getBusquedaCiudadDivipola(this.latitude, this.longitude)).subscribe(async responseGeocode => {
      this.divipola = responseGeocode;
      // console.log("divipola " + JSON.stringify(this.divipola));

      if (this.dataMedicamento != undefined) {
        (await this.BusquedaService.getBusquedaMedicamento(window.localStorage['idPrescripcion'], this.dataMedicamento.idmedicamento, this.divipola.osmtags.divipola, this.dataMedicamento.cantidad)).subscribe(
          response => {
            this.farmacia = response;
            // console.log("farmacia " + JSON.stringify(this.divipola));

            this.loadMap();
          });
      } else {
        (await this.BusquedaService.getBusquedaPrescripcion(this.dataPrescripcion.idprescripcion, this.divipola.osmtags.divipola)).subscribe(
          response => {
            this.farmacia = response;
            // console.log("farmacia " + JSON.stringify(this.divipola));

            this.loadMap();
          });
      }

    });
  }

  loadMap() {
    console.log("load map");
    let mapEle: HTMLElement = document.getElementById('map');
    let myLatLng = { lat: this.latitude, lng: this.longitude };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 11
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.miUbicacion();
      this.renderMarkers(this.map);
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
      '<h3 id="firstHeading" class="firstHeading">Mi Ubicación</h3>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    let marker = new google.maps.Marker({
      //position: {lat: temp[0].toString(), lng: temp[1].toString()},
      position: { lat: this.latitude, lng: this.longitude },
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: icon,
      title: "Mi ubicación"
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(this.map, marker);
    });
  }

  renderMarkers(map) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    this.farmacia.forEach(farmacia => {
      var evalua = false;
      farmacia.farmacia.medicamentoBusqueda.forEach(element => {
        if (element.disponible) {
          evalua = true;
        }
      });

      if (evalua) {

        var infoWindowContent =
          '<h5 id="firstHeading" class="firstHeading">' + farmacia.farmacia.razonsocial + '</h5>' +
          '<b>Dirección: </b> ' + farmacia.farmacia.direccion + ', </br>' +
          '<b>Telefono: </b>' + farmacia.farmacia.telefono + ', </br>';

        farmacia.farmacia.medicamentoBusqueda.forEach(element => {
          if (element.disponible) {
            infoWindowContent += '<b>Medicamento: </b>' + element.datosMedicamento.descripcioncliente + '</br>';
          }
        });

        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': farmacia.farmacia.direccion + ", " + farmacia.farmacia.ciudad.descripcion + ", " + farmacia.farmacia.departamento.descripcion }, function (results, status) {
          if (status === 'OK') {
            let temp = results[0].geometry.location.toString().replace('(', '').replace(')', '').split(',');
            //console.log(new LatLng(Number.parseFloat(temp[0]), Number.parseFloat(temp[1])));

            var marker = new google.maps.Marker({
              position: new LatLng(Number.parseFloat(temp[0]), Number.parseFloat(temp[1])),
              draggable: true,
              animation: google.maps.Animation.DROP,
              map: map,
              title: farmacia.farmacia.razonsocial
            });

            google.maps.event.addListener(marker, 'click', function (evt) {

              let origin = { lat: Number.parseFloat(window.localStorage['lat']), lng: Number.parseFloat(window.localStorage['lng']) };
              let destination = { lat: Number.parseFloat(evt.latLng.lat().toFixed(3)), lng: Number.parseFloat(evt.latLng.lng().toFixed(3)) };

              // infoWindowContent += '<a href="https://www.google.com/maps?q=' + Number.parseFloat(evt.latLng.lat().toFixed(3)) + ',' + Number.parseFloat(evt.latLng.lng().toFixed(3)) + '" target="_blank">Ver en Google Maps</a>';

              infoWindow.open(map, marker);

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

              directionsRenderer.setMap(map);
            });
          }
          else {
            console.log("salio");
          }
        });
      }
    });
  }
}
