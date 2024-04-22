import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeliculasService]
})

export class HomeComponent implements OnInit {

  public peliculas: Array<any> = [];
  public url: string;
  public tomarCategoria: Array<any> = [];

  public todos: boolean;
  public comedia: boolean
  public aventura: boolean
  public accion: boolean
  public animacion: boolean
  public terror: boolean

  constructor(
    private _peliculasService: PeliculasService
  ) {
    this.url = Global.url;

    this.todos = true;
    this.comedia = false;
    this.aventura = false;
    this.accion = false;
    this.animacion = false;
    this.terror = false
  };

  ngOnInit(): void {
    this.obtenerPeliculas();
    window.scrollTo(0, 0);
  };

  obtenerPeliculas() {
    this._peliculasService.obtenerPeliculas().subscribe(
      response => {
        if (response.listado) {
          this.peliculas = response.listado;
        };
      },
      error => {
        console.log(error);
      }
    );
  };

  obtenerGenero(genero: string) {

    if (genero == "todos") {
      this.desmarcar();
      this.todos = true;
    }

    else if (genero == "comedia") {
      if (this.comedia == true) {
        this.comedia = false;
        this.todos = true;
        this.tomarCategoria = [];
      } else {
        this.desmarcar();
        this.comedia = true;
        this.todos = false;
        this.tomarCategoria = [];

        for (let pelicula in this.peliculas) {
          if (this.peliculas[pelicula].genre.includes('Comedia')) {
            this.tomarCategoria.push(this.peliculas[pelicula]);
          }
        }
      }
    }

    else if (genero == "aventura") {
      if (this.aventura == true) {
        this.aventura = false;
        this.todos = true;
        this.tomarCategoria = [];
      } else {
        this.desmarcar();
        this.aventura = true;
        this.todos = false;
        this.tomarCategoria = [];

        for (let pelicula in this.peliculas) {
          if (this.peliculas[pelicula].genre.includes('Aventura')) {
            this.tomarCategoria.push(this.peliculas[pelicula]);
          }
        }
      }
    }

    else if (genero == "accion") {
      if (this.accion == true) {
        this.accion = false;
        this.todos = true;
        this.tomarCategoria = [];
      } else {
        this.desmarcar();
        this.accion = true;
        this.todos = false;
        this.tomarCategoria = [];

        for (let pelicula in this.peliculas) {
          if (this.peliculas[pelicula].genre.includes('Acción')) {
            this.tomarCategoria.push(this.peliculas[pelicula]);
          }
        }
      }
    }

    else if (genero == "animacion") {
      if (this.animacion == true) {
        this.animacion = false;
        this.todos = true;
        this.tomarCategoria = [];
      } else {
        this.desmarcar();
        this.animacion = true;
        this.todos = false;
        this.tomarCategoria = [];

        for (let pelicula in this.peliculas) {
          if (this.peliculas[pelicula].genre.includes('Animación')) {
            this.tomarCategoria.push(this.peliculas[pelicula]);
          }
        }
      }
    }

    else if (genero == "terror") {
      if (this.terror == true) {
        this.terror = false;
        this.todos = true;
        this.tomarCategoria = [];
      } else {
        this.desmarcar();
        this.terror = true;
        this.todos = false;
        this.tomarCategoria = [];

        for (let pelicula in this.peliculas) {
          if (this.peliculas[pelicula].genre.includes('Terror')) {
            this.tomarCategoria.push(this.peliculas[pelicula]);
          }
        }
      }
    }
  }

  desmarcar() {
    this.comedia = false
    this.aventura = false
    this.accion = false
    this.animacion = false
    this.terror = false
  }
}
