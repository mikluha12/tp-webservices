import { Routes } from '@angular/router';
import { Peliculas } from './components/peliculas/peliculas';
import { Autos } from './components/autos/autos';
import { Conversor } from './components/conversor/conversor';
import { TextToSpeech } from './components/text-to-speech/text-to-speech';
import { Clima } from './components/clima/clima';

export const routes: Routes = [
  { path: '', redirectTo: 'peliculas', pathMatch: 'full' },
  { path: 'peliculas', component: Peliculas },
  { path: 'autos', component: Autos },
  { path: 'conversor', component: Conversor },
  { path: 'text-to-speech', component: TextToSpeech },
  { path: 'clima', component: Clima },
];
