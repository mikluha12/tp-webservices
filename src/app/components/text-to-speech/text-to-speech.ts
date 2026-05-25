import { Component, ChangeDetectorRef } from '@angular/core';
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

  texto: string = 'Hola Mundo!';
  voz: string = 'alloy';

  voces = [
    'alloy',
    'echo',
    'fable',
    'onyx',
    'nova',
    'shimmer'
  ];

  audioUrl: string = '';

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  convertir() {

    this.audioUrl = '';

    this.api.textToSpeech(
      this.texto,
      this.voz
    ).subscribe(

      (data: Blob) => {

        this.audioUrl = URL.createObjectURL(data);

        this.cd.detectChanges();
      },

      (error) => {
        console.log(error);
      }
    );
  }
}