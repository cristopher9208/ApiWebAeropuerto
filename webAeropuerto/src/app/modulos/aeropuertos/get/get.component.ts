import { Component, OnInit } from '@angular/core';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private AeropuertoService: AeropuertoService) { }
  listado: AeropuertoModel[] = []  
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.AeropuertoService.getAll().subscribe((data: AeropuertoModel[]) => {
      this.listado = data
      console.log(data)
    })
  }
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.AeropuertoService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}
