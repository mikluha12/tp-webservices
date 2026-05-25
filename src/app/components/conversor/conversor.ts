import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [FormsModule, NgForOf, CommonModule],
  templateUrl: './conversor.html'
})
export class Conversor implements OnInit {

  from: string = '';
  to: string = '';
  amount: number = 0;

  final: any = null;

  monedas: Array<{codigo: string, nombre: string}> = [];

  // Variables congeladas
  fromSaved: string = '';
  toSaved: string = '';
  amountSaved: number = 0;

  constructor(
    private api: ApiService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarMonedas();
  }

  cargarMonedas() {

    this.api.getCurrencies().subscribe({

      next: (result: any) => {

        this.zone.run(() => {

          this.monedas = result.supported_codes.map(
            ([codigo, nombre]: [string, string]) => {
              return { codigo, nombre };
            }
          );

        });

      },

      error: (error) => console.log(error)
    });
  }

  convertir() {

    this.api.convertCurrency(
      this.from,
      this.to,
      this.amount
    ).subscribe({

      next: (result: any) => {

        this.zone.run(() => {

          // Guardar valores congelados
          this.fromSaved = this.from;
          this.toSaved = this.to;
          this.amountSaved = this.amount;

          // Resultado final
          this.final = result;

        });

      },

      error: (error) => {
        console.log(error);
      }
    });
  }
}