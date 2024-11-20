import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bottom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bottom.component.html',
  styleUrl: './menu-bottom.component.css'
})
export class MenuBottomComponent implements OnInit {
  menu: Array<any> = [
    { name: 'Muted', icon: 'uil uil-microphone' },
    { name: 'Home', icon: 'uil uil-estate' },
    { name: 'Share', icon: 'uil uil-share' },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
