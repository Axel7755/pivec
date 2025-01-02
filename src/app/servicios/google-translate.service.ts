import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GoogleTranslateService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLanguage: string) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
    const body = {
      q: text,
      target: targetLanguage,
      format: 'text', // Asegúrate de incluir esto
      //source: 'es' // Puedes establecer el idioma de origen si lo sabes
    };

    // Imprimimos la solicitud completa en la consola
    console.log('URL:', url);
    console.log('Body:', body);

    return this.http.post(url, body);
  }
}