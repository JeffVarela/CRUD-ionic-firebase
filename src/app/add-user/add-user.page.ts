import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  usuario = {
    nombre: '',
    email: '',
    ciudad: '',
    sexo: '',
  };

  radioSexo = ['F','M'];

  ciudades = ['Managua','Masaya','Granada','Rivas','León','Matagapa']

  constructor() { }

  ngOnInit() {
  }

  onSubmiteTemplate(){
    console.log('onSubmiteTemplate se esta ejecutando');
    console.log(this.usuario);
  }

}
