import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  lista: Lista;
  nombreItem = '';

  constructor( private deseosService: DeseosService,
               private route: ActivatedRoute) {

      const listaId = this.route.snapshot.paramMap.get('listaId');
      //console.log(listaId);

      this.lista = this.deseosService.getLista( listaId );

      //console.log(this.lista);



   }

   agregarItem(){


    if( this.nombreItem.length === 0 ){
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );
    this.deseosService.saveStorage();
    this.nombreItem = '';

   }

   cambioCheck( item: ListaItem ){

    //console.log(item);

    const pendientes = this.lista.items.filter( itemData => !itemData.completado );
    //console.log(pendientes.length);
    if (pendientes.length === 0){
      this.lista.terminadaEn = new Date;
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseosService.saveStorage();

   }

// Se podría enviar ésta función a deseosService
   borrarItem( i: number ){

    this.lista.items.splice( i, 1 );
    console.log('El item se borró correctamente');
    this.deseosService.saveStorage();
   }
}
