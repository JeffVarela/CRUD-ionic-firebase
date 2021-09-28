import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UsuariosService } from 'src/app/service/usuarios.service';


@Component({
  selector: 'app-pop-info',
  templateUrl: './pop-info.component.html',
  styleUrls: ['./pop-info.component.css']
})
export class PopInfoComponent implements OnInit {

  funciones = ['Borrar', 'Editar'];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {
  }


  onClick(valor: string) {

    console.log('itemHijo', valor);

    this.popCtrl.dismiss({
      item: valor
    });
  }

}
