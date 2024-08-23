import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { Global } from "./global.service";

@Injectable()

export class PeliculasService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url
    }

    obtenerPeliculas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listado', { headers: headers });
    }

    detallesPelicula(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'pelicula/' + id, { headers: headers });
    }
}
