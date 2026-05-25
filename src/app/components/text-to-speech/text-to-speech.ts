import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-to-speech.html'
})
export class TextToSpeech {
  texto = '';
  voz = 'alloy';  // opciones: alloy, echo, fable, onyx, nova, shimmer
  voces = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
  audioUrl: string | null = null;
  cargando = false;
  error = '';

  constructor(private api: ApiService) {}

  convertir() {
    if (!this.texto.trim()) return;
    this.cargando = true;
    this.audioUrl = null;
    this.error = '';

    this.api.textToSpeech(this.texto, this.voz).subscribe({
      next: (blob: Blob) => {
        this.audioUrl = URL.createObjectURL(blob);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo generar el audio.';
        this.cargando = false;
      }
    });
  }
}