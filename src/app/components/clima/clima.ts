import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clima.html'
})
export class Clima {
  ciudad = '';
  clima: any = null;
  cargando = false;
  error = '';

  constructor(private api: ApiService) {}

  buscar() {
    if (!this.ciudad.trim()) return;
    this.cargando = true;
    this.clima = null;
    this.error = '';

    this.api.getWeather(this.ciudad).subscribe({
      next: (data) => { this.clima = data; this.cargando = false; },
      error: () => {
        this.error = 'Ciudad no encontrada.';
        this.cargando = false;
      }
    });
  }

  getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}