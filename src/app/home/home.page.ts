import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuariosService } from '../service/usuarios.service';
import { PopInfoComponent } from '../components/pop-info/pop-info.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  usuarios: any[] = [];

  constructor(private router: Router,
    private usuarioServise: UsuariosService,
    private popCtrl: PopoverController,
    public actionSheetCrl: ActionSheetController) {



  }
  ngOnInit(){
   this.getUsuario();
  }

  /* funcion del pop */
 /*  async mostrarPop(event){
    const popover = await this.popCtrl.create({
      component: PopInfoComponent,
      event: event,
      mode: 'ios',
    

    });

    await popover.present()
    const {data} = await popover.onWillDismiss();  //se ejecuta antes de cerrarce
    console.log('padre:', data);
  } */

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

  eliminarUsuario(id: string){
    this.usuarioServise.eliminarUsuario(id).then(() => {
      console.log('el empleado ha sido eliminado con exito');
      
    }).catch(error => {
      console.log(error);
    })
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  /* --------------------------------------------- */
  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetCrl.create({
      header: 'Albums',
      //backdropDismiss: false, /* para que no se cancele el action sheet al tocar la pantalla */
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'rojo', /* css personalizada para color rojo, creada en global.css */
        handler: () => {
          //console.log('Delete clicked');
          this.eliminarUsuario(id)
        }
      }, {
        text: 'Editar',
        icon: 'pencil-outline',
        handler: () => {
          console.log('Editar clicked');
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
