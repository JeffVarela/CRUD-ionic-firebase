import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  @ViewChild('formulario') form: NgForm;

  usuario = {
    nombre: '',
    email: '',
    ciudad: '',
    sexo: '',
  };

  radioSexo = ['F','M'];

  ciudades = ['Managua','Masaya','Granada','Rivas','León','Matagapa']

  id: string;

/* ActivatedRoute para capturar el id que capturamos en la ruta */
  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private aRoute: ActivatedRoute
              ) { }

  ngOnInit() {
    this.id = this.aRoute.snapshot.paramMap.get('id')
    console.log(this.id);
   
   this.esEditar();
  }
  

  
  onSubmiteTemplate(id: string){

    console.log('onSubmiteTemplate se esta ejecutando');
    console.log(this.usuario);

    const usuario: any = {
      name: this.usuario.nombre,
      email: this.usuario.email,
      sex: this.usuario.sexo,
      city: this.usuario.ciudad,
  
      fechaActualizacion: new Date()
    }
    this.usuarioService.actualizarUsuario(id, usuario).then(()=> {
      this.router.navigate(['/home'])
    })

  }
  
  esEditar(){
   
    this.usuarioService.getUsuarios(this.id).subscribe(data => { 
      console.log(data.payload.data()['name']);
      this.form.setValue({
        nombre: data.payload.data()['name'], /* escribir los datos en el input */
        email: data.payload.data()['email'],
        sexo: data.payload.data()['sex'],
        ciudades: data.payload.data()['city'],
      })
    })
  
}


}
