import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuariosService } from '../service/usuarios.service';
import { PopInfoComponent } from '../components/pop-info/pop-info.component';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
   animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],//importar BrowserAnimation en app.module
  // animations: [
  //   trigger(
  //     'enterAnimation', [
  //       transition(':enter', [
  //         style({ opacity: 0}),
  //         animate('5s', style({ opacity: 1}))
  //       ])/* ,
  //       transition(':leave', [
  //         style({transform: 'translateX(0)', opacity: 1}),
  //         animate('5s', style({transform: 'translateX(100%)', opacity: 0}))
  //       ]) */
  //     ]
  //   )
  // ],
})
export class HomePage {

  usuarios: any[] = [];
  bandMostrar: boolean = true;

  constructor(private router: Router,
    private usuarioServise: UsuariosService,
    private popCtrl: PopoverController,
    public actionSheetCrl: ActionSheetController,
    public alertCtrl: AlertController,
    private toast: ToastController) {



  }
  ngOnInit(){
   this.getUsuario();
  }

  /* funcion del pop -------------------------------------*/

   async mostrarPop(event, id){
    const popover = await this.popCtrl.create({
      component: PopInfoComponent,
      event: event,
      mode: 'ios',
    });

    await popover.present()
    const {data} = await popover.onDidDismiss();

    if (data)
    {
      if (data.item === 'Borrar')
      {
        //console.log('mandar a borrar: ' + id);
        this.presentAlertConfirm(id)
      }
      else if (data.item === 'Editar')
      {
        //console.log('mandar a editar: ' + id);
        this.redirectUser(id)

      }
    }

  }
  /* -------------------------Alerta-------------------------- */

  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
      header: '¿Desea eliminar el Usuario?',
      message: '<strong>Pulse si para confirmar</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          }
        }, {
          text: 'si',
          handler: () => {
           // console.log('Confirm Okay');
           this.eliminarUsuario(id);


          }
        }
      ]
    });

    await alert.present();
  }


  /* --------------------------------------------------- */

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
  /* -------------------------------------------------------------------- */

  eliminarUsuario(id: string){
    this.usuarioServise.eliminarUsuario(id).then(() => {
      console.log('el empleado ha sido eliminado con exito');

    }).catch(error => {
      console.log(error);
    })
  }

  redirectUser(id: string){
   this.router.navigate(['/edit-user/', id]);
  }

  /* -------------------------------------------------------------- */

  addUser() {
    this.router.navigate(['/add-user']);
  }
  /* ----------funcion de buscar------------------------------------ */

  textoBuscar = '';

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }

  /* --------------------------------------------- */
 /*  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetCrl.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'rojo',
        handler: () => {
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
  } */

  async mostrartoast(){
    const toast = await this.toast.create({
      message: 'Your settings have been saved.',
      duration: 2000,
      cssClass: 'toast-class'
    });
    toast.present();

    this.bandMostrar = !this.bandMostrar;
  }
}
