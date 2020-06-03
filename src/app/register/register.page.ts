import { Component, OnInit, ɵConsole } from '@angular/core';
import { TipoDocumentoService } from '../api/tipo-documento.service';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../api/usuario.service';
import { IpsService } from '../api/ips.service';
import { DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5';
import { Ips } from '../interfaces/ips';
import { DepartamentoService } from '../api/departamento.service';
import { Departamento } from '../interfaces/departamento';
import { CiudadService } from '../api/ciudad.service';
import { Ciudad } from '../interfaces/ciudad';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  tipDoc: TipoDocumento;
  usuario: Usuario;
  ips: Ips;
  departamento: Departamento;
  ciudad: Ciudad;
  mensajeError: string;
  ngUsuario = {};
  jsonUsuario: any;

  constructor(
    private TipoDocumentoService: TipoDocumentoService,
    private IpsService: IpsService,
    private route: ActivatedRoute,
    private router: Router,
    private UsuarioService: UsuarioService,
    private DepartamentoService: DepartamentoService,
    private CiudadService: CiudadService,
    private datePipe: DatePipe
  ) { }

  registrar() {
    try {
      this.validacionFormulario(this.ngUsuario);

      this.usuario = {
        idips: this.jsonUsuario.ips.idips,
        documento: this.jsonUsuario.documento,
        nombre: this.jsonUsuario.primerNombre + " " + this.jsonUsuario.segundoNombre,
        apellidos: this.jsonUsuario.primerApellido + " " + this.jsonUsuario.segundoApellido,
        idtipodocumento: this.jsonUsuario.tipoDocumento,
        direccion: this.jsonUsuario.direccion,
        fechaexpedicion: this.datePipe.transform(new Date(this.jsonUsuario.fechaExpedicion), "yyyy-MM-dd"),
        fechanacimiento: this.datePipe.transform(new Date(this.jsonUsuario.fechaNacimiento), "yyyy-MM-dd"),
        contrasena: Md5.hashStr(this.jsonUsuario.contrasenaInicial).toString(),
        estado: "A",
        correo: this.jsonUsuario.correo,
        idtipousuario: 1,
        fechacreacion: this.datePipe.transform(Date.now(), "yyyy-MM-dd"),
        fechamodificacion: "",
        idusuario: 0
      };

      this.UsuarioService.put(this.usuario).subscribe(response => {
        this.usuario = response;
        console.log("user=" + this.usuario);
        console.log("user=" + JSON.stringify(this.usuario));
        this.router.navigate(['login']);
      });

    } catch (error) {
      this.mensajeError = error.message;
    }
  }

  async ngOnInit() {
    (await this.TipoDocumentoService.getAll()).subscribe(tipoDocumento => { this.tipDoc = tipoDocumento; });
    (await this.DepartamentoService.getAll()).subscribe(departamento => { this.departamento = departamento; console.log(this.departamento); });
  }

  async cargarCiudad(valor) {
    console.log(valor);
    this.jsonUsuario = this.ngUsuario;
    this.jsonUsuario.ciudad = "";
    (await this.CiudadService.getAllbyDepartamento(valor.iddepartamento)).subscribe(ciudad => { this.ciudad = ciudad; console.log(this.ciudad); });
  }

  async cargarIps(valor) {
    console.log(valor);
    this.jsonUsuario = this.ngUsuario;
    this.jsonUsuario.ips = "";
    (await this.IpsService.getAllbyCiudad(valor.idciudad)).subscribe(ips => { this.ips = ips; console.log(this.ips); });
  }

  cancelar() {
    this.router.navigate(['login']);
  }

  validacionFormulario(ngRegistrar) {

    this.jsonUsuario = this.ngUsuario;
    console.log(this.ngUsuario);
    if (ngRegistrar.tipoDocumento == undefined || ngRegistrar.tipoDocumento == "") {
      throw new Error("Debe seleccionar el Tipo de documento valido");
    }
    if (this.validaNumero(ngRegistrar.documento) == 0 || ngRegistrar.documento == undefined || ngRegistrar.documento == "") {
      throw new Error("Debe ingresar un documento valido");
    }
    if (ngRegistrar.primerNombre == "" || ngRegistrar.primerNombre == undefined) {
      throw new Error("Debe ingresar un nombre");
    }
    if (ngRegistrar.primerApellido == "" || ngRegistrar.primerApellido == undefined) {
      throw new Error("Debe ingresar un apellido");
    }
    if (ngRegistrar.contrasenaInicial != ngRegistrar.contrasenaFinal) {
      throw new Error("Las Contraseña no coinciden");
    }
    if (ngRegistrar.correo == "" || ngRegistrar.correo == undefined) {
      throw new Error("Debe ingresar un correo");
    }
    if (ngRegistrar.fechaNacimiento == "" || ngRegistrar.fechaNacimiento == undefined) {
      throw new Error("Debe ingresar una fecha de nacimiento");
    }
    if (ngRegistrar.fechaExpedicion == "" || ngRegistrar.fechaExpedicion == undefined) {
      throw new Error("Debe ingresar una fecha de expedicion");
    }
    if (ngRegistrar.ips == undefined || ngRegistrar.ips == "") {
      throw new Error("Seleccione una Ips valida");
    }
    if (ngRegistrar.contrasenaInicial == "" || ngRegistrar.contrasenaFinal == "" || ngRegistrar.contrasenaInicial == null || ngRegistrar.contrasenaFinal == null) {
      throw new Error("Debe ingresar una contraseña");
    }
    if (ngRegistrar.direccion == "" || ngRegistrar.direccion == undefined) {
      throw new Error("Debe ingresar una direccion");
    }
  }

  validaNumero(numero) {
    try {
      numero = Number.parseInt(numero);
      if (isNaN(numero)) {
        return 0;
      }
      else {
        return numero;
      }
    } catch (error) {
      return 0;
    }
  }
}
