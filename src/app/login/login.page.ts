import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../api/user.service';
import { TipoDocumento } from '../interfaces/tipo-documento';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  tipDoc: TipoDocumento[];
  compareWith = this.tipDoc;
  username:string='not updated';
  constructor(private userService: UserService) { }
 
  ngOnInit() {
    this.tipDoc = [
      { id: 1, name: 'Seleccione...', sigla: 'AA' },
      { id: 2, name: 'Cédula de Ciudadanía', sigla: 'CC' },
      { id: 3, name: 'Cédula de Extranjería', sigla: 'CE' },
      { id: 4, name: 'Pasaporte', sigla: 'PA' },
      { id: 5, name: 'Registro Civil', sigla: 'RC' },
      { id: 6, name: 'Tarjeta de Identidad', sigla: 'TI' }
    ];
  }

  getUser() {
    console.log("entro get user" + this.username);
    this.userService.getUser(this.username).subscribe(user => { console.log(user) })
  }

  getAllUser() {
    console.log("entro all user");
    this.userService.getAllUser().subscribe(user => { console.log(user) })
  }
  
}