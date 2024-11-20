import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-in-reu',
  standalone: true,
  imports: [],
  templateUrl: './in-reu.component.html',
  styleUrl: './in-reu.component.css'
})
export class InReuComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  goToRoom = () => {
    this.router.navigate(['/', uuidv4()]);
  }

}
