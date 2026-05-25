import { Component, OnInit } from '@angular/core';
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
  cargando = true;
  cargandoModelos = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCarBrands().subscribe({
      next: (data) => { this.marcas = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  verModelos(marca: any) {
    this.marcaSeleccionada = marca.name;
    this.modelos = [];
    this.cargandoModelos = true;
    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('modalModelos'));
    modal.show();
    // Cargar modelos
    this.api.getCarModels(marca.id).subscribe({
      next: (data) => { this.modelos = data; this.cargandoModelos = false; },
      error: () => { this.cargandoModelos = false; }
    });
  }
}