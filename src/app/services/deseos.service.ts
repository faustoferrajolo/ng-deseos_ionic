import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {

    this.loadStorage();
    // const lista1 = new Lista('Titulo Lista 1');
    // const lista2 = new Lista('Titulo Lista 2');

    //this.listas.push(lista1, lista2);

    //console.log(this.listas);

  }


  crearLista( titulo: string ){
    const nuevaLista = new Lista( titulo );
    this.listas.push( nuevaLista );
    this.saveStorage();
    return nuevaLista.id;
  }

  borrarLista( lista: Lista ){

    this.listas = this.listas.filter( listaData => listaData.id !== lista.id);
    // Es lo mismo que hacer ésto de acá abajo:

    // this.listas.filter( listaData => {
    //   return listaData.id !== lista.id;
    // });
    console.log('Se borró la lista correctamente');
    this.saveStorage();

  }

  editarLista( lista: Lista ){
    this.listas = this.listas.filter( listaData => listaData.id == lista.id);
    console.log(this.listas);





  }

  getLista( id: string | number ){

    id = Number( id );

    return this.listas.find( listaData => listaData.id === id );

  }


  saveStorage(){

    localStorage.setItem('data', JSON.stringify(this.listas));

  }

  loadStorage(){
    if( localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }else{
      this.listas = [];
    }

  }
}
