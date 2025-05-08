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

  irParaApontamentoOperador() {
    this.router.navigate(['/apontamento'], { queryParams: { tipo: 'operador' } });
  }
  irParaApontamentoEstacao() {
    this.router.navigate(['/apontamento'], { queryParams: { tipo: 'estacao' } });
  }
  irParaGridApontamento() {
    this.router.navigate(['/grid-apontamento']);
  }
  

}
