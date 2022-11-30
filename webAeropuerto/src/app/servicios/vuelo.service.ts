import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VueloModel } from '../modelos/vuelo.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();  
    }
    store(vuelo: VueloModel): Observable<VueloModel> {
      return this.http.post<VueloModel>(`${this.url}/vuelos`, {
        fecha_inicio: vuelo.fecha_inicio,
        hora_inicio: vuelo.hora_inicio,
        fecha_fin: vuelo.fecha_fin,
        hora_fin: vuelo.hora_fin,
        asientos_vendidos: vuelo.asientos_vendidos,
        nombre_piloto: vuelo.nombre_piloto,
        ruta: vuelo.ruta,
        password: ""
      });
    }
    getAll(): Observable<VueloModel[]>{
      return this.http.get<VueloModel[]>(`${this.url}/vuelos`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    update(vuelo: VueloModel): Observable<VueloModel> {
      return this.http.patch<VueloModel>(`${this.url}/vuelos/${vuelo.id}`, {
        fecha_inicio: vuelo.fecha_inicio,
        hora_inicio: vuelo.hora_inicio,
        fecha_fin: vuelo.fecha_fin,
        hora_fin: vuelo.hora_fin,
        asientos_vendidos: vuelo.asientos_vendidos,
        nombre_piloto: vuelo.nombre_piloto,
        ruta: vuelo.ruta,
        password: ""
      }, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        }) 
      });
    }
    delete(id: string): Observable<VueloModel[]>{
      return this.http.delete<VueloModel[]>(`${this.url}/vuelos/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    getWithId(id: string): Observable<VueloModel>{
      return this.http.get<VueloModel>(`${this.url}/vuelos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }    
    getCount(): Observable<VueloModel[]>{
      return this.http.get<VueloModel[]>(`${this.url}/vuelos/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
