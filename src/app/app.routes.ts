import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/usuarios.guard';
import { ConfiguracaoComponent } from './pages/configuracao/configuracao.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard],
      },

      {
        path: '',
        component: CartComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'configuracao',
    component: ConfiguracaoComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'relatorio',
    component: RelatorioComponent,
    canActivate: [AdminGuard],
  },

  {
    path: '**',
    redirectTo: 'usuarios',
  },
];
