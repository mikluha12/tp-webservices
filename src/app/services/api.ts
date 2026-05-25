import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private rapidApiKey = environment.rapidApiKey;

  constructor(private http: HttpClient) {}

  // A - Películas
  getTopMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.rapidApiKey,
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    });
    return this.http.get('https://imdb-top-100-movies.p.rapidapi.com/', { headers });
  }

  // B - Marcas de autos
  getCarBrands(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.rapidApiKey,
      'x-rapidapi-host': 'car-specs.p.rapidapi.com'
    });
    return this.http.get('https://car-specs.p.rapidapi.com/v2/cars/makes', { headers });
  }

  // B - Modelos por marca
  getCarModels(makeId: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.rapidApiKey,
      'x-rapidapi-host': 'car-specs.p.rapidapi.com'
    });
    return this.http.get(`https://car-specs.p.rapidapi.com/v2/cars/models?makeId=${makeId}`, { headers });
  }

  // C - Conversor de moneda
  getCurrencies(): Observable<any> {
    return this.http.get(
      `https://api.apilayer.com/currency_data/list`,
      { headers: new HttpHeaders({ 'apikey': environment.currencyApiKey }) }
    );
  }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(
      `https://api.apilayer.com/currency_data/convert?from=${from}&to=${to}&amount=${amount}`,
      { headers: new HttpHeaders({ 'apikey': environment.currencyApiKey }) }
    );
  }

  // D - Text to Speech
  textToSpeech(text: string, lang: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.rapidApiKey,
      'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
      'Content-Type': 'application/json'
    });
    return this.http.post(
      'https://open-ai-text-to-speech1.p.rapidapi.com/',
      { model: 'tts-1', input: text, voice: lang },
      { headers, responseType: 'blob' }
    );
  }

  // E - Clima (OpenWeatherMap, gratis)
  getWeather(city: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric&lang=es`
    );
  }
}