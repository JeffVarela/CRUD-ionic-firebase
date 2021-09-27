import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(newUser: any): Promise<any> { 
    return this.firestore.collection('usuarios').add(newUser)
   }

   getUsuario(): Observable<any>{
    return this.firestore.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
    /* ref los ordena por fecha de creacion */
  }
}
