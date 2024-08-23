import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
  providers: [PeliculasService]
})

export class DetallesComponent implements OnInit {

  public pelicula: any = {};
  public url: string

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.detallesPelicula(id);
    });
    window.scrollTo(0, 0);
  }

  constructor(
    private _peliculasService: PeliculasService,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url
  }

  detallesPelicula(id: string) {
    this._peliculasService.detallesPelicula(id).subscribe(
      res => {
        this.pelicula = res.pelicula
      },
      err => {
        console.log(err);
      }
    )
  }
}




