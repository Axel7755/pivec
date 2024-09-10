import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleScholarService } from '../google-scholar.service';

@Component({
  selector: 'app-scholar-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <input [(ngModel)]="query" placeholder="Buscar en Google Académico">
      <button (click)="search()">Buscar</button>
      <div *ngIf="results">
        <div *ngFor="let result of results.items">
          <h3>{{ result.title }}</h3>
          <p>{{ result.snippet }}</p>
          <a [href]="result.link" target="_blank">Leer más</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./scholar-search.component.css']
})
export class ScholarSearchComponent implements OnInit {

  query: string='';
  results: any;

  constructor(private googleScholarService: GoogleScholarService) {}

  search() {
    this.googleScholarService.search(this.query).subscribe((data: any) => {
      this.results = data;
    });
  }

  ngOnInit() {}
}