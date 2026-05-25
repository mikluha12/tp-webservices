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

getCarBrands(): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.rapidApiKey,
    'x-rapidapi-host': 'car-specs.p.rapidapi.com'
  });
  return this.http.get('https://car-specs.p.rapidapi.com/v2/cars/makes', { headers });
}

getCarModels(makeId: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.rapidApiKey,
    'x-rapidapi-host': 'car-specs.p.rapidapi.com'
  });
  return this.http.get(`https://car-specs.p.rapidapi.com/v2/cars/makes/${makeId}/models`, { headers });
}

 
getCurrencies(): Observable<any> {
  return this.http.get(
    `https://v6.exchangerate-api.com/v6/${environment.currencyApiKey}/codes`
  );
}

convertCurrency(from: string, to: string, amount: number): Observable<any> {
  return this.http.get(
    `https://v6.exchangerate-api.com/v6/${environment.currencyApiKey}/pair/${from}/${to}/${amount}`
  );
}

  
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

 
  getWeather(city: string): Observable<any> {
     const cityEncoded = encodeURIComponent(city.trim());
  return this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&appid=${environment.weatherApiKey}&units=metric&lang=es`
  );
  }
}
