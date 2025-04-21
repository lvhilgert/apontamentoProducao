import { Routes } from '@angular/router';
import { ApontamentoComponent } from './apontamento/apontamento.component'; // importa o componente

export const routes: Routes = [
  { path: 'apontamento', component: ApontamentoComponent },
  { path: '**', redirectTo: 'apontamento' } // opcional: qualquer rota inválida manda pro apontamento
];
