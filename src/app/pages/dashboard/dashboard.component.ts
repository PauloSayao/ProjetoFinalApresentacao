import { Component, OnInit } from '@angular/core';
import { Product } from '../../cart/cart.service';
import { OrderService, Pedido } from '../../order/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.loadPedidos();
  }
  loadPedidos() {
    this.orderService.getPedidos().subscribe({
      next: dados => this.pedidos = dados.filter(p => !p.entregue),
      error: err => console.error('Erro ao carregar pedidos:', err)
    });
  }

  marcarComoEntregue(id: number) {
    this.orderService.updatePedido(id, { entregue: true }).subscribe({
      next: () => this.loadPedidos(),
      error: err => console.error('Erro ao marcar pedido como entregue:', err)
    });
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











