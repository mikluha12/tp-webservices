import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor.html'
})
export class Conversor implements OnInit {
  monedas: string[] = [];
  desde = 'USD';
  hasta = 'ARS';
  monto = 1;
  resultado: number | null = null;
  cargando = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCurrencies().subscribe({
      next: (data) => {
        this.monedas = Object.keys(data.currencies);
      }
    });
  }

  convertir() {
    this.cargando = true;
    this.resultado = null;
    this.api.convertCurrency(this.desde, this.hasta, this.monto).subscribe({
      next: (data) => {
        this.resultado = data.result;
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }
}