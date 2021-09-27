import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { Router } from '@angular/router';

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

  /* inyectamos el usuarioService */
  constructor(private usuarioService: UsuariosService,
              private router: Router) { }

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
