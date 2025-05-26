import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'] // <- corrigido: era "styleUrl"
})
export class RelatorioComponent implements OnInit {
  pedidos: any[] = [];
  totalPedidos: number = 0;
  produtosVendidos: { nome: string; quantidade: number }[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarPedidos() {
    this.orderService.getPedidos().subscribe({
      next: (res) => {
        this.pedidos = res.map(p => ({
          ...p,
          total: p.produtos.reduce((sum: number, prod: any) => sum + prod.price * prod.quantity, 0)
        }));
        this.totalPedidos = this.pedidos.length;
        this.carregarProdutosMaisVendidos(this.pedidos);
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos:', err);
      }
    });
  }

  carregarProdutosMaisVendidos(pedidos: any[]) {
    const contagem: { [nome: string]: number } = {};

    pedidos.forEach((pedido: any) => {
      pedido.produtos.forEach((produto: any) => {
        contagem[produto.name] = (contagem[produto.name] || 0) + produto.quantity;
      });
    });

    this.produtosVendidos = Object.entries(contagem)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  ToHome(){
    this.router.navigate(['/login']);
  }
  ToOrder(){
    this.router.navigate(['/dashboard']);
  }
  ToConfiguration(){
    this.router.navigate(['/configuracao']);
  }
  ToRelatorio(){
    this.router.navigate(['/relatorio']);
  }
}
