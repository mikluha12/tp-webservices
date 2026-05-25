import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

declare var bootstrap: any;

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autos.html'
})
export class Autos implements OnInit {
  marcas: any[] = [];
  modelos: any[] = [];
  marcaSeleccionada = '';
  cargando = false;
  cargandoModelos = true;

  constructor(private api: ApiService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getCarBrands().subscribe({
      next: (data) => {  this.marcas = data; 
  console.log('primera marca:', data[0]);
  this.cargando = false;  },
      error: () => { this.cargando = false; }
    });
  }

  verModelos(marca: any) {
  this.marcaSeleccionada = marca.name;
  this.modelos = [];
  this.cargandoModelos = true;
  const modal = new bootstrap.Modal(document.getElementById('modalModelos'));
  modal.show();
  this.api.getCarModels(marca.id).subscribe({
    next: (data) => {
      console.log('modelos raw:', data);
      this.modelos = data;
      this.cargandoModelos = false;
      this.cd.detectChanges();
    },
    error: (err) => {
      console.log('error modelos:', err);
      this.cargandoModelos = false;
    }
  });
}

}
