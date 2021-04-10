import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseoService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {

  }


  async agregarLista(){


    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name:'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],



      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
      },
      {
        text: 'Crear',
        handler: (data) => {
          console.log(data);
          if(data.titulo.lenght === 0 ){
            return;
          }

          const listaId = this.deseoService.crearLista( data.titulo );
          this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);

        }
      }
    ]
    });

    alert.present();



  }

  // listaSeleccionada( lista: Lista ){

  //   //console.log(lista);

  //   this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
  // }

}
