import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  usuario = {
    nombre: '',
    email: '',
    ciudad: '',
    sexo: '',
  };

  radioSexo = ['F','M'];

  ciudades = ['Managua','Masaya','Granada','Rivas','León','Matagapa']

  constructor(private usuarioService: UsuariosService,
              private router: Router,
              ) { }

  ngOnInit() {
  }

  
  onSubmiteTemplate(){

    console.log('onSubmiteTemplate se esta ejecutando');
    console.log(this.usuario);

    const usuario: any = {
      name: this.usuario.nombre,
      email: this.usuario.email,
      sex: this.usuario.sexo,
      city: this.usuario.ciudad,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    
    this.usuarioService.agregarUsuario(usuario).then(() => {
     console.log('empleado registrado con exito');
     this.router.navigate(['/home'])
    }).catch (error => {
      console.log(error);
    })

  }

}
