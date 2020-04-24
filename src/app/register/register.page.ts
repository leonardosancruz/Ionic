import { Component, OnInit, ɵConsole } from '@angular/core';
import { TipoDocumentoService } from '../api/tipo-documento.service';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../api/usuario.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  tipDoc: TipoDocumento;
  usuario: Usuario;
  mensajeError: string;
  ngUsuario = {};
  temp: any;
  datePipe: Date;


  constructor(
    private TipoDocumentoService: TipoDocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private UsuarioService: UsuarioService
  ) { }

  registrar() {
    this.validacionFormulario(this.ngUsuario);

    this.usuario = {
      idips: this.temp.idips,
      documento: this.temp.documento,
      nombre: this.temp.primerNombre.toUpperCase() + " " + this.temp.segundoNombre.toUpperCase(),
      apellidos: this.temp.primerApellido.toUpperCase() + " " + this.temp.segundoApellido.toUpperCase(),
      idtipodocumento: this.temp.tipoDocumento,
      direccion: this.temp.direccion,
      fechaexpedicion: this.datePipe.transform(this.temp.fechaExpedicion),
      fechanacimiento: this.datePipe.transform(this.temp.fechaExpedicion),
      contrasena: this.temp.contrasenaInicial,
      estado: "A",
      correo: this.temp.correo,
      idtipousuario: this.temp.idtipousuario,
      fechacreacion: this.datePipe.transform(this.temp.fechaExpedicion),
      fechamodificacion: this.datePipe.transform(this.temp.fechaExpedicion),
      idusuario: 0
    };
    console.log("2"+this.usuario);
    console.log("3"+this.ngUsuario);

    this.UsuarioService.put(this.usuario).subscribe(response => {
      this.usuario = response;
      console.log("user=" + this.usuario);
      console.log("user=" + JSON.stringify(this.usuario));
      // this.router.navigate(['login']);
    });
  }

  async ngOnInit() {
    (await this.TipoDocumentoService.getAll()).subscribe(tipoDocumento => { this.tipDoc = tipoDocumento; });
  }

  cancelar() {
    this.router.navigate(['login']);
  }

  validacionFormulario(ngRegistrar) {
    this.temp = this.ngUsuario;
    if (ngRegistrar.contrasenaInicial != ngRegistrar.contrasenaFinal) {
      this.mensajeError = "Contraseña no coincide";
    } else if (ngRegistrar.contrasenaInicial == "" || ngRegistrar.contrasenaFinal == "" || ngRegistrar.contrasenaInicial == null || ngRegistrar.contrasenaFinal == null) {
      this.mensajeError = "Debe ingresar una contraseña";
    }
  }
}
