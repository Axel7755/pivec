import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

    this.noSearchDone = false; // Marca que se ha hecho la búsqueda

    this.isLoading = true;  // Muestra el indicador de carga
    this.errorMessage = null;  // Limpia los mensajes de error previos
    this.results = [];  // Limpia los resultados previos

    //const apiUrl = `https://serpapi.com/search?q=${encodeURIComponent(this.query)}&api_key=d968a88a4a3215da3da618e6836d8e9b6721255dc6f9e4bed38aa332ee118b9e`;  // Reemplaza con tu API key
    const apiUrl = `https://serpapi.com/search?engine=google_scholar&q=${encodeURIComponent(this.query)}&api_key=d968a88a4a3215da3da618e6836d8e9b6721255dc6f9e4bed38aa332ee118b9e`;


    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log('Respuesta de la API:', data);  // Verifica la respuesta completa
        if (data && data.organic_results && Array.isArray(data.organic_results)) {
          // Si `organic_results` es un arreglo y contiene datos
          this.results = data.organic_results.map((item: any) => ({
            title: item.title || 'Sin título',
            snippet: item.snippet || 'Sin descripción',
            link: item.link || '#'
          }));
        } else {
          this.results = [];
          this.errorMessage = 'No se encontraron resultados para tu búsqueda.';
        }
        this.isLoading = false;  // Oculta el indicador de carga
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Se produjo un error al buscar. Intenta nuevamente.';
        console.error('Error fetching data:', error);
      }
    });
  }

}
