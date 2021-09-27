import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  usuarios: any[] = [];

  constructor(private router: Router,
    private usuarioServise: UsuariosService) {



  }
  ngOnInit(){
   this.getUsuario();
  }

  getUsuario() {
    this.usuarioServise.getUsuario().subscribe(data => {
      this.usuarios = [];
      /* console.log(data); */
      data.forEach((element: any) => {
        /*   console.log(element.payload.doc.id);
          console.log(element.payload.doc.data()); */
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.usuarios);
    });
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

}
