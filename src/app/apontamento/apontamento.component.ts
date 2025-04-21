import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apontamento',
  templateUrl: './apontamento.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./apontamento.component.css']
})
export class ApontamentoComponent {
  criarNovaOrdem = true;
  ordemProducao = '';
  operacao: string = '10';
  turno = 'MANHÃ';
  estacaoDeTrabalho = 'MAQ1';
  operador = 'João';
  item = '';
  quantidadeApontada: number = 0;
  duplaChecagem: number = 0;
  quantidadeTotalDuplaChecagem: number = 0;
  dataInicio: string = '';
  horaInicio: string = '';
  dataFim: string = '';
  horaFim: string = '';

  showConfig: boolean = false;
  showMostraInicioFim = false;
  showOpModal = false;
  showItemModal = false;
  showQuantidadeModal = false;
  showDuplaChecagemModal: boolean = false;

  //Motivos de parada
  motivoDeParada: string = 'FIM_OP';
  usaParada: boolean = true;
  //Turno
  usaTurno = false;
    //Início e fim
  mostrarInicioFim = true;
  usaDuplaChecagem = false;
  
  

  quantidadeTotal = 0;
  leituras: number[] = [];
  leiturasDuplaChecagem: number[] = [];

  ordens = ['Ordem de Produção 10', 'Ordem de Produção 11', 'Ordem de Produção 12'];
  itens = [
    { codigo: '001', descricao: 'Sacola extra-forte 20x30cm' },
    { codigo: '002', descricao: 'Sacola reciclável 25x35cm' },
    { codigo: '003', descricao: 'Sacola grande 30x40cm' }
  ];

  ngOnInit() {
    const hoje = new Date().toISOString().substring(0, 10);
    this.dataInicio = hoje;
    this.dataFim = hoje;
    this.atualizarHoras();
  }

  toggleInicioFim() {
    this.mostrarInicioFim = !this.mostrarInicioFim;
  }


  abrirConfig() {
    this.showConfig = true;
  }
  
  fecharConfig() {
    this.showConfig = false;
  }

  atualizarHoras() {
    if (!this.usaTurno) {
      return; // Se não usa turno, não faz nada
    }
    if (this.turno === 'MANHÃ') {
      this.horaInicio = '08:00:00';
      this.horaFim = '12:00:00';
    } else if (this.turno === 'TARDE') {
      this.horaInicio = '13:00:00';
      this.horaFim = '18:00:00';
    } else if (this.turno === 'NOITE') {
      this.horaInicio = '19:00:00';
      this.horaFim = '23:00:00';
    }
  }

  iniciar() {
    const agora = new Date();
    this.dataInicio = agora.toISOString().substring(0, 10);
    this.horaInicio = agora.toTimeString().substring(0, 8);
  }
  
  parar() {
    const agora = new Date();
    this.dataFim = agora.toISOString().substring(0, 10);
    this.horaFim = agora.toTimeString().substring(0, 8);
  }
  

  openOPModal() {
    this.showOpModal = true;
  }

  openItemModal() {
    this.showItemModal = true;
  }

  openQuantityModal() {
    this.showQuantidadeModal = true;
  }

  selectOP(op: string) {
    this.ordemProducao = op;
    this.showOpModal = false;
  }

  selectItem(item: string) {
    this.item = item;
    this.showItemModal = false;
  }

  incluirLeitura() {
    const quantidade = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    this.leituras.push(quantidade);
    this.quantidadeTotal += quantidade;
  }

  finalizarLeitura() {
    this.quantidadeApontada = this.quantidadeTotal;
    this.showQuantidadeModal = false;
  }

  closeModal() {
    this.showOpModal = false;
    this.showItemModal = false;
    this.showQuantidadeModal = false;
  }

  finalizarApontamento() {
    if (confirm('Tem certeza de que deseja finalizar o apontamento?')) {
      alert('Apontamento finalizado!');
      this.limparDados();
    }
  }

  limparDados() {
    this.ordemProducao = '';
    this.turno = 'MANHÃ';
    this.estacaoDeTrabalho = 'MAQ1';
    this.operador = 'João';
    this.item = '';
    this.quantidadeApontada = 0;
    this.quantidadeTotal = 0;
    this.leituras = [];
  }

  //Dupla checagem

  // Abrir modal
openDuplaChecagemModal() {
  this.showDuplaChecagemModal = true;
}

// Incluir nova leitura aleatória
incluirLeituraDuplaChecagem() {
  const quantidade = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  this.leiturasDuplaChecagem.push(quantidade);
  this.quantidadeTotalDuplaChecagem = this.leiturasDuplaChecagem.reduce((a, b) => a + b, 0);
}

// Finalizar leitura
finalizarLeituraDuplaChecagem() {
  this.duplaChecagem = this.quantidadeTotalDuplaChecagem;
  this.closeModalDuplaChecagem();
}

// Fechar modal
closeModalDuplaChecagem() {
  this.showDuplaChecagemModal = false;
}

}
