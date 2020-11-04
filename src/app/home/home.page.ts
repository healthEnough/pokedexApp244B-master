import { Component } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  next: string
  previous: string
  totalPaginas = 0
  pagina = 1
  listaPokemonApi = []
  listaPokemonExibir = []

  constructor(private pokeapi: PokeapiService) {
    this.buscarPokemons()
  }

  async buscarPokemons() {
    this.pokeapi.buscarPokemons().subscribe(dados => {
      this.listaPokemonApi = []
      this.totalPaginas = dados['count']
      this.previous = dados['previous']
      this.next = dados['next']
      let listaApi = dados['results']

      for (let item of listaApi) {
        this.pokeapi.buscarPokemonNumero(item.url).subscribe(dadosPokemons => {
          this.listaPokemonApi.push(dadosPokemons)
          this.ordenarLista()
        })
      }

    })
  }
  
  ordenarLista() {
    this.listaPokemonApi.sort((a, b) => {
      if(a.id > b.id) {
        return 1
      }
      if(a.id < b.id) {
        return -1
      }
      return 0
    })
    this.listaPokemonExibir = this.listaPokemonApi
  }
  
  paginacao(url, movimento) {
    this.pagina = this.pagina + movimento
    this.pokeapi.url = url
    this.buscarPokemons()
  }

}
