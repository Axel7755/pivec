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

  constructor(private googleTranslateService: GoogleTranslateService) {}


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
}