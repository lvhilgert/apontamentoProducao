import { Routes } from '@angular/router';
import { ApontamentoComponent } from './apontamento/apontamento.component'; // importa o componente
import { InicialComponent } from './inicial/inicial.component';
import { ApontamentoCompletoComponent } from './apontamento-completo/apontamento-completo.component';
import { GridApontamentoComponent } from './grid-apontamento/grid-apontamento.component';


export const routes: Routes = [
  { path: 'apontamento', component: ApontamentoComponent },
  { path: 'inicial', component: InicialComponent },
  { path: 'apontamento-completo', component: ApontamentoCompletoComponent },
  { path: 'grid-apontamento', component: GridApontamentoComponent },
  { path: '**', redirectTo: 'inicial' } // opcional: qualquer rota inválida manda pro apontamento
];
