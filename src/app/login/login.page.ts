import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { UsuarioService } from '../api/usuario.service';
import { TipoDocumentoService } from '../api/tipo-documento.service';
import { TipoDocumento } from '../interfaces/tipo-documento';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  tipDoc: TipoDocumento;
  documento: number;
  contrasena: string;
  tipoDocumento: number;
  mensajeError: string;
  
  constructor(
    private userService: UsuarioService,
    private TipoDocumentoService: TipoDocumentoService,
    public navCtrl: NavController,
    private router: Router
  ) { }

  async ngOnInit() {
    (await this.TipoDocumentoService.getAll()).subscribe(tipoDocumento => { this.tipDoc = tipoDocumento; });
  }

  async ingresar() {
    try {
      if (this.documento == null) {
        this.mensajeError = "Debe ingresar un numero de documento.";
      }
      else if (this.contrasena == null || this.contrasena == "") {
        this.mensajeError = "Debe ingresar la contraseña.";
      }
      else if (this.tipoDocumento == null || this.tipoDocumento == 0) {
        this.mensajeError = "Debe seleccionar un tipo de documento valido.";
      }
      else {
        this.mensajeError = "";
        (await this.userService.getId(this.documento)).subscribe(user => {
          console.log(user);
          if (user.idtipodocumento != this.tipoDocumento || user.contrasena != Md5.hashStr(this.contrasena)) {
            this.mensajeError = "Documento o contraseña invalida.";
          } else {
            this.navCtrl.navigateForward('register');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  registrar() {
    this.router.navigate(['register']);
  }

  mapa(){
    this.router.navigate(['ubicacion']);
  }

}