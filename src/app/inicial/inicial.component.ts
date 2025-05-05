import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apontamento',
  templateUrl: './inicial.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./inicial.component.css']
})

export class InicialComponent {

  constructor(private router: Router) {}

  irParaApontamento() {
    this.router.navigate(['/apontamento']);
  }

}
