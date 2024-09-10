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
  query: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  results: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Puedes inicializar datos aquí si es necesario
  }

  searchScholar() {
    this.isLoading = true;
    this.errorMessage = null;
    this.results = [];

    const apiUrl = `https://serpapi.com/search.json?engine=google_scholar&q=${this.query}&api_key=285f0000d24c1d580fa2ac8c40d920ecb2e3e4eaa2846de0594a04885a0de593`;

    this.http.get(apiUrl).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.results = data.results || [];
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Se produjo un error al buscar.';
        console.error('Error fetching data:', error);
      }
    });
  }
}