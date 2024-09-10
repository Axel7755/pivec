import { Component, OnInit } from '@angular/core';
import { GoogleAcademicoService } from './google-academico.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule

@Component({
  selector: 'app-google-academico',
  standalone: true, // Componente independiente
  imports: [HttpClientModule, FormsModule, CommonModule], // Incluye FormsModule y CommonModule
  templateUrl: './google-academico.component.html',
  styleUrls: ['./google-academico.component.css'],
  host: { 'ngSkipHydration': '' }  // Esto saltea el proceso de hydration
})
export class GoogleAcademicoComponent implements OnInit {
  query: string = ''; // Para almacenar la consulta de búsqueda
  isLoading: boolean = false; // Para mostrar un indicador de carga
  errorMessage: string | null = null; // Para almacenar mensajes de error
  results: any[] = []; // Para almacenar los resultados de la búsqueda

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Puedes inicializar datos aquí si es necesario
  }

  searchScholar() {
    fetch('/api/search.json?engine=google_scholar&q=html&api_key=285f0000d24c1d580fa2ac8c40d920ecb2e3e4eaa2846de0594a04885a0de593')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Aquí procesas los datos que te devuelve la API
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

}