import { Component } from '@angular/core';
import { GoogleTranslateService } from '../servicios/google-translate.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Aquí se importa HttpClientModule
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent {
  text: string = '';
  language: string = 'es';
  translatedText: string | undefined;

  constructor(private googleTranslateService: GoogleTranslateService) { }


  translateText() {
    console.log('TranslateText method called'); // Añade esto

    this.googleTranslateService.translateText(this.text, this.language).subscribe(
      (response: any) => {
        console.log('Response:', response); // Esto imprimirá la respuesta
        this.translatedText = response.data.translations[0].translatedText;
      },
      (error) => {
        console.error('Error al traducir:', error); // Esto imprimirá el error
      }
    );
  }

  // Función de altavoz
  speakText() {
    if ('speechSynthesis' in window && this.translatedText) {
      const utterance = new SpeechSynthesisUtterance(this.translatedText);

      // Configuración del idioma basado en el seleccionado
      switch (this.language) {
        case 'fr':
          utterance.lang = 'fr-FR'; // Francés
          break;
        case 'en':
          utterance.lang = 'en-US'; // Inglés
          break;
        case 'de':
          utterance.lang = 'de-DE'; // Alemán
          break;
        case 'it':
          utterance.lang = 'it-IT'; // Italiano
          break;
        case 'es':
          utterance.lang = 'es-ES'; // Español
          break;
        default:
          utterance.lang = 'en-US'; // Idioma predeterminado
      }

      // Reproducir la síntesis de voz
      speechSynthesis.speak(utterance);
    } else {
      console.error('SpeechSynthesis no es compatible con este navegador o no hay texto traducido.');
    }
  }


}