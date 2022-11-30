import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:3000"
  token: string = ''
  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();      
    }
    store(usuario: UsuarioModel): Observable<UsuarioModel> {
      return this.http.post<UsuarioModel>(`${this.url}/usuarios`, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        correo: usuario.correo,
        password: ""
      });
    }
    getAll(): Observable<UsuarioModel[]>{
      return this.http.get<UsuarioModel[]>(`${this.url}/usuarios`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    update(usuario: UsuarioModel): Observable<UsuarioModel> {
      return this.http.patch<UsuarioModel>(`${this.url}/usuarios/${usuario.id}`, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        correo: usuario.correo,
        password: ""
      }, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        }) 
      });
    }
    delete(id: string): Observable<UsuarioModel[]>{
      return this.http.delete<UsuarioModel[]>(`${this.url}/usuarios/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    getWithId(id: string): Observable<UsuarioModel>{
      return this.http.get<UsuarioModel>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }    
    getCount(): Observable<UsuarioModel[]>{
      return this.http.get<UsuarioModel[]>(`${this.url}/usuarios/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}