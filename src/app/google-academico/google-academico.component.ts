import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-google-academico',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './google-academico.component.html',
  styleUrls: ['./google-academico.component.css'],
  host: {
    'ngSkipHydration': ''
  }
})
export class GoogleAcademicoComponent implements OnInit {
  query: string = '';  // Variable para la consulta de búsqueda
  isLoading: boolean = false;  // Indicador de carga
  errorMessage: string | null = null;  // Mensaje de error
  results: any[] = [];  // Resultados de la búsqueda
  noSearchDone: boolean = true;  // Variable para controlar si se ha realizado la búsqueda

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Puedes inicializar datos aquí si es necesario
  }

  // Método que maneja la búsqueda
  searchScholar() {
    if (!this.query.trim()) {
      this.errorMessage = 'Por favor ingresa un término de búsqueda.';
      return;
    }
  
    this.noSearchDone = false;
  
    this.isLoading = true;
    this.errorMessage = null;
    this.results = [];
  
    const apiUrl = `${environment.apiUrl}:8080/search?q=${encodeURIComponent(this.query)}`;
    console.log(apiUrl);
  
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log('Respuesta de la API:', data);
        if (data && data.results && Array.isArray(data.results)) {
          this.results = data.results.map((item: any) => ({
            title: item.title || 'Sin título',
            snippet: item.snippet || 'Sin descripción',
            link: item.link || '#'
          }));
        } else {
          this.results = [];
          this.errorMessage = 'No se encontraron resultados para tu búsqueda.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Se produjo un error al buscar. Intenta nuevamente.';
        console.error('Error fetching data:', error);
      }
    });
  }  

}