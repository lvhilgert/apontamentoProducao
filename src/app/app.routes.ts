import { Routes } from '@angular/router';
import { ApontamentoComponent } from './apontamento/apontamento.component'; // importa o componente
import { InicialComponent } from './inicial/inicial.component';
import { ApontamentoCompletoComponent } from './apontamento-completo/apontamento-completo.component';

export const routes: Routes = [
  { path: 'apontamento', component: ApontamentoComponent },
  { path: 'inicial', component: InicialComponent },
  { path: 'apontamento-completo', component: ApontamentoCompletoComponent },
  { path: '**', redirectTo: 'apontamento' } // opcional: qualquer rota inválida manda pro apontamento
];
