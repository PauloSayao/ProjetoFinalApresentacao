import { Injectable } from '@angular/core';
import { Product } from '../../app/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

export interface Pedido {
  id: number;
  produtos: Product[];
  nome: string;
  telefone: string;
  pagamento: string;
  entregue: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3001/pedidos';

  constructor(private http: HttpClient) {}

  addPedido(pedido: { produtos: Product[], nome: string, telefone: string, pagamento: string }) {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }


  getPedidos(): Observable<Pedido[]> {
    return this.http.get<{ pedidos: Pedido[] }>(this.apiUrl).pipe(
      map(res => res.pedidos)
    );
  }


  removePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePedido(id: number, data: Partial<Pedido>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }


  limparPedidos(): Observable<any> {
    return this.getPedidos().pipe(
      map(pedidos => pedidos.map(p => this.removePedido(p.id))),
      map(deletes => forkJoin(deletes))
    );
  }

}
