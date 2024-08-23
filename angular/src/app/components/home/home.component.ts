import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

interface Pelicula {
  age: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeliculasService]
})

export class HomeComponent implements OnInit {

  public url: string;
  public peliculas: Array<any> = [];
  public generos: Set<string> = new Set();
  public generoElegido: Array<any> = [];
  public generoSeleccionado: string = '';

  constructor(
    private peliculasService: PeliculasService
  ) {
    this.url = Global.url;
  }

  public ngOnInit(): void {
    const genero = localStorage.getItem('generoSeleccionado') || 'Todas';

    const storedGeneros = sessionStorage.getItem('generos');

    if (storedGeneros) {
      this.generos = new Set(JSON.parse(storedGeneros));
    }

    this.listarPeliculas(genero);
  }

  public listarPeliculas(generoParam: any): void {
    localStorage.setItem('generoSeleccionado', generoParam);
    this.peliculas = [];

    this.peliculasService.obtenerPeliculas().subscribe(
      res => {
        if (generoParam === 'Todas') {
          this.peliculas = res.listado || [];
          this.generoSeleccionado = 'Todas';
          this.obtenerGeneros();
        } else {
          this.generoSeleccionado = generoParam;
          this.peliculas = res.listado.filter((pelicula: Pelicula) =>
            pelicula.genre.includes(generoParam)
          );
        }
      },
      err => {
        console.error('Error al obtener las películas:', err);
      }
    );
  }

  public obtenerGeneros(): void {
    this.generos.clear();
    if (this.peliculas.length > 0) {
      this.peliculas.forEach((pelicula: Pelicula) => {
        if (pelicula.genre) {
          const generosPorPeli = pelicula.genre.split(' - ').map(g => g.trim());
          generosPorPeli.forEach(genero => this.generos.add(genero));
        }
      });
      sessionStorage.setItem('generos', JSON.stringify(Array.from(this.generos)));
    }

  }

};