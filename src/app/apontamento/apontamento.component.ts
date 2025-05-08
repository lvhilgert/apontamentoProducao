import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apontamento',
  templateUrl: './apontamento.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./apontamento.component.css']
})
export class ApontamentoComponent {
  criarNovaOrdem = false;
  ordemProducao = '';
  operacao: string = '';
  turno = 'MANHÃ';
  estacaoDeTrabalho = '';
  operador = '';
  item = '';
  quantidadeApontada: number = 0;
  quantidadeApontadaTotal: number = 0;
  duplaChecagem: number = 0;
  quantidadeTotalDuplaChecagem: number = 0;
  dataInicio: string = '';
  horaInicio: string = '';
  dataFim: string = '';
  horaFim: string = '';
  concluirOperacao: boolean = false;

  showConfig: boolean = false;
  showMostraInicioFim = false;
  showOpModal = false;
  showItemModal = false;
  showQuantidadeModal = false;
  showDuplaChecagemModal: boolean = false;
  showInformarInicio: boolean = false;
  showInformarFim: boolean = false;
  showQtProdNessaOperacao: boolean = true;
  showAdicionarProd: boolean = true;
  valorAdicionarProd: number = 1;

  apontamentoIniciado: boolean = false;
  apontamentoFinalizado: boolean = false;
  operacaoFinalizada: boolean = false;

  //Motivos de parada
  motivoDeParada: string = 'FIM_OP';
  usaParada: boolean = true;
  //Turno
  usaTurno = false;
    //Início e fim
  mostrarInicioFim = true;
  usaDuplaChecagem = false;
  
  //Usa criarção de OP no apontamento
  usaCriarOp = false;

  //Cronômetro:
  cronometroAtivo = false;
  tempoDecorrido = 0; // em segundos
  intervalo: any;
  duracaoManual = '00:00:00';

  //Tipo do apontamento:
  tipoDoApontamento: string = '';

  quantidadeTotal = 0;
  leituras: number[] = [];
  leiturasDuplaChecagem: number[] = [];

  ordens = ['10 - 001 (Sacola extra-forte 20x30cm)', '11 - 002 (Sacola reciclável 25x35cm)', '12 - 003 (Sacola grande 30x40cm)'];
  itens = [
    { codigo: '001', descricao: 'Sacola extra-forte 20x30cm' },
    { codigo: '002', descricao: 'Sacola reciclável 25x35cm' },
    { codigo: '003', descricao: 'Sacola grande 30x40cm' }
  ];
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    const hoje = new Date().toISOString().substring(0, 10);
    this.dataInicio = hoje;
    this.dataFim = hoje;
    this.atualizarHoras();
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      const tipo = params['tipo'];
      this.tipoDoApontamento = tipo || 'completo';
    });
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
    if (!this.showInformarInicio) {
      const agora = new Date();
      this.dataInicio = agora.toISOString().substring(0, 10);
      this.horaInicio = agora.toTimeString().substring(0, 8);
    }
  
    this.apontamentoIniciado = true;
    this.alternarCronometro();
  }
  
  
  parar() {
    const agora = new Date();
    this.dataFim = agora.toISOString().substring(0, 10);
    this.horaFim = agora.toTimeString().substring(0, 8);
  }
  
  fimDaOperacao() {
    if (!this.showInformarFim) {
      const agora = new Date();
      this.dataFim = agora.toISOString().substring(0, 10);
      this.horaFim = agora.toTimeString().substring(0, 8);
    }
  
    if (this.cronometroAtivo) {
      clearInterval(this.intervalo);
      this.cronometroAtivo = false;
    }
  
    this.duracaoManual = this.calcularDuracaoEntreInicioEFim();
    this.apontamentoFinalizado = true;
    this.operacaoFinalizada = true;
  }
  

  pausar() {
    if (!this.showInformarFim) {
      const agora = new Date();
      this.dataFim = agora.toISOString().substring(0, 10);
      this.horaFim = agora.toTimeString().substring(0, 8);
    }
  
    if (this.cronometroAtivo) {
      clearInterval(this.intervalo);
      this.cronometroAtivo = false;
    }
  
    this.duracaoManual = this.calcularDuracaoEntreInicioEFim();
    this.apontamentoFinalizado = true;
  }
  

  calcularDuracaoEntreInicioEFim(): string {
    if (!this.dataInicio || !this.horaInicio || !this.dataFim || !this.horaFim) return "00:00:00";
  
    const inicio = new Date(`${this.dataInicio}T${this.horaInicio}`);
    const fim = new Date(`${this.dataFim}T${this.horaFim}`);
  
    const segundos = Math.max(0, Math.floor((fim.getTime() - inicio.getTime()) / 1000));
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
  
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  }

  adicionarQtProd() {
    const valor = Number(this.valorAdicionarProd) || 0;
    const atual = Number(this.quantidadeApontadaTotal) || 0;
    this.quantidadeApontadaTotal = atual + valor;
  }

  
  novoApontamento() {
    this.apontamentoFinalizado = false;
    this.apontamentoIniciado = false;
    this.showInformarInicio = false;
    this.showInformarFim = false;
  
    // Limpar início e fim
    this.dataInicio = '';
    this.horaInicio = '';
    this.dataFim = '';
    this.horaFim = '';
  
    // Limpar ordem de produção e operação
    this.ordemProducao = '';
    this.operacao = '';
  
    // Limpar quantidades (exceto qt planejada)
    this.quantidadeApontada = 0;
    this.duplaChecagem = 0;
    this.duracaoManual = '00:00:00';
  
    // Parar cronômetro se ainda estiver ativo
    if (this.cronometroAtivo) {
      clearInterval(this.intervalo);
      this.cronometroAtivo = false;
    }
  
    // Outras flags opcionais
    this.operacaoFinalizada = false;
  }

  reiniciar() {
    this.apontamentoFinalizado = false;
    this.apontamentoIniciado = true;
    this.showInformarInicio = false;
    this.showInformarFim = false;
  
    // Limpar fim e reiniciar início
    const agora = new Date();
    this.dataInicio = agora.toISOString().substring(0, 10);
    this.horaInicio = agora.toTimeString().substring(0, 8);
    this.dataFim = '';
    this.horaFim = '';
  
    // Limpar quantidades (exceto qt planejada)
    this.quantidadeApontada = 0;
    this.duplaChecagem = 0;
    this.duracaoManual = '00:00:00';
  
    // Parar cronômetro se ainda estiver ativo
    if (this.cronometroAtivo) {
      clearInterval(this.intervalo);
      this.cronometroAtivo = false;
    }
    //Iniciar cronômetro
    this.alternarCronometro();
  
    // Outras flags opcionais
    this.operacaoFinalizada = false;
  }

  cancelar() {
    window.location.reload();
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

get tempoFormatado(): string {
  const horas = Math.floor(this.tempoDecorrido / 3600).toString().padStart(2, '0');
  const minutos = Math.floor((this.tempoDecorrido % 3600) / 60).toString().padStart(2, '0');
  const segundos = (this.tempoDecorrido % 60).toString().padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
}

  alternarCronometro() {
    if (this.cronometroAtivo) {
      clearInterval(this.intervalo);
      this.cronometroAtivo = false;
      this.definirInicioEFim();
    } else {
      if (!this.showInformarInicio) {
        const agora = new Date();
        this.dataInicio = agora.toISOString().split('T')[0];
        this.horaInicio = agora.toTimeString().substring(0, 8);
      }

      this.tempoDecorrido = 0;
      this.cronometroAtivo = true;
      this.intervalo = setInterval(() => {
        this.tempoDecorrido++;
        this.duracaoManual = this.tempoFormatado;
      }, 1000);
    }
  }


atualizarDuracaoManual() {
  const partes = this.duracaoManual.split(':');
  if (partes.length === 3) {
    const horas = parseInt(partes[0], 10) || 0;
    const minutos = parseInt(partes[1], 10) || 0;
    const segundos = parseInt(partes[2], 10) || 0;
    this.tempoDecorrido = horas * 3600 + minutos * 60 + segundos;
    this.definirInicioEFim();
  }
}

definirInicioEFim() {
  const agora = new Date();
  this.dataFim = agora.toISOString().split('T')[0];
  this.horaFim = agora.toTimeString().substring(0, 8);

  const inicio = new Date(agora.getTime() - this.tempoDecorrido * 1000);
  this.dataInicio = inicio.toISOString().split('T')[0];
  this.horaInicio = inicio.toTimeString().substring(0, 8);
}

apontarQuantidade() {
  this.quantidadeApontadaTotal = this.quantidadeApontadaTotal + this.quantidadeApontada;
  this.quantidadeApontada = 0;
}

}
