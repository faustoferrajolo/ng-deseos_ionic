import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() terminada = true;
  @ViewChild( IonList ) lista: IonList;

  constructor(public deseoService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }


  listaSeleccionada( lista: Lista ){

    //console.log(lista);
    if ( this.terminada ){

      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);

    }else{

      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);

    }

  }

  borrarLista( lista: Lista ){

    this.deseoService.borrarLista( lista );

  }

  async editarLista( lista: Lista ){

    //this.deseoService.editarLista( lista );

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name:'titulo',
          type: 'text',
          value: lista.titulo,
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
        text: 'Actualizar',
        handler: (data) => {
          console.log(data);
          if(data.titulo.lenght === 0 ){
            return;
          }

          lista.titulo = data.titulo;

          this.deseoService.saveStorage();

        }
      }
    ]
    });
    this.lista.closeSlidingItems();
    alert.present();
  }

  }
