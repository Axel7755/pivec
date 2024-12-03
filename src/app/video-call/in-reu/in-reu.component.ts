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
    //aqui deve de ir el id de el grupo que tendra la clase
    //this.router.navigate(['room/', uuidv4()]);
    this.router.navigate(['room/', "3cm2-2-2023"]);
  }

}
