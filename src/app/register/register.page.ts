import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../api/tipo-documento.service';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../api/usuario.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  tipDoc: TipoDocumento;
  user: Usuario;

  tipoDocumento: number;
  documento: number;
  primerNombre: string = "";
  segundoNombre: string = "";
  primerApellido: string = "";
  segundoApellido: string = "";
  fechaExpedicion: Date;
  fechaNacimiento: Date;
  direccion: string = "";
  correo: string = "";
  contrasenaInicial: string = "";
  contrasenaFinal: string = "";
  estado: string = "A";
  idtipousuario: number = 1;
  idips: number = 1;
  fechaCreacion: Date;
  fechamodificacion: Date;
  idusuario: number;

  constructor(
    private TipoDocumentoService: TipoDocumentoService,
    private UsuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {

    ///recibe los parametros enviados

    // this.route.queryParams.subscribe(params => {
    //   if (params && params.special) {
    //     this.data = JSON.parse(params.special);
    //     console.log(this.data);
    //   }
    // });
  }

  async ngOnInit() {
    (await this.TipoDocumentoService.getAll()).subscribe(tipoDocumento => { this.tipDoc = tipoDocumento; });
  }

  aceptar() {

console.log("fecha" + this.tipoDocumento);

    let usuario: Usuario;
    usuario = {
      idips: this.idips,
      documento: this.documento,
      nombre: this.primerNombre + " " + this.segundoNombre,
      apellidos: this.primerApellido + " " + this.segundoApellido,
      idtipodocumento: this.tipoDocumento,
      direccion: this.direccion,
      fechaexpedicion: this.datePipe.transform(this.fechaExpedicion,"yyyy-MM-dd"),
      fechanacimiento: this.datePipe.transform(this.fechaExpedicion,"yyyy-MM-dd"),
      contrasena: this.contrasenaFinal,
      estado: this.estado,
      correo: this.correo,
      idtipousuario: this.idtipousuario,
      fechacreacion: "",
      fechamodificacion: "",
      idusuario: 0
    };

    console.log(usuario);
    console.log("Entra al registrar Usuario");

    this.UsuarioService.put(usuario).subscribe(response => {
      this.user = response;
      console.log("user=" + this.user);
      console.log("user=" + JSON.stringify(this.user));
      this.router.navigate(['login']);
    });


    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     special: JSON.stringify(usuario)
    //   }
    // };

    //this.router.navigate(['register'], navigationExtras);
  }

  cancelar() {
    this.router.navigate(['login']);
  }
}
