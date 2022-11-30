import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VueloModel } from 'src/app/modelos/vuelo.model';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private vueloService: VueloService,
    private router: Router,
    private route: ActivatedRoute) { }

  listadoRutas: RutaModel[] = []

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    nombre_piloto: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });


  getWithId(id: string){
    this.vueloService.getWithId(id).subscribe((data: VueloModel) => {
    console.log(data)
    
    this.fgValidacion.controls["id"].setValue(id)
    this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio as string)//toTimeString() //toLocaleString('en-US')
    this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio as string)
    this.fgValidacion.controls["fecha_fin"].setValue(data.fecha_fin as string)
    this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin as string)
    this.fgValidacion.controls["asientos_vendidos"].setValue(String(data.asientos_vendidos))
    this.fgValidacion.controls["nombre_piloto"].setValue(data.nombre_piloto as string)
    this.fgValidacion.controls["ruta"].setValue(data.ruta as string)

  })
  }

  edit(){
    let vuelo = new VueloModel();
    vuelo.id = this.fgValidacion.controls["id"].value as string;
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string//new Date(this.fgValidacion.controls["fecha_inicio"].value as string) as Date;
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;// as Date;
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as string;
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value as string;
    vuelo.ruta = this.fgValidacion.controls["ruta"].value as string;

    this.vueloService.update(vuelo).subscribe((data: VueloModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllRutas(){
    this.rutaService.getAll().subscribe((data: RutaModel[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }

  ngOnInit(): void {
      //obtiene el id de la URL
      let id = this.route.snapshot.params["id"]
      //consulta la informacion del usuario
      this.getWithId(id);
      this.getAllRutas()
  }

}