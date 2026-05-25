import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.html'
})
export class Peliculas implements OnInit {
  peliculas: any[] = [];
  cargando = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTopMovies().subscribe({
      next: (data) => { this.peliculas = data; this.cargando = false; },
      error: () => { this.error = 'No se pudieron cargar las películas.'; this.cargando = false; }
    });
  }
}