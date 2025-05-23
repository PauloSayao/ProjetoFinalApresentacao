import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NgxMaskDirective, MatSnackBarModule],
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isRegistering = false;

  // Campos para login
  name = '';
  password = '';

  // Campos para registro
  registerName = '';
  fullName = '';
  registerEmail = '';
  registerPassword = '';
  registerTelephone = '';
  confirmPassword = '';
  consentLGPD = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
  }

  login() {
    this.http
      .post<any>('http://localhost:3001/login', {
        name: this.name,
        password: this.password,
      })

      .subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          if (res.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/usuarios']);
          }
        },

        error: (err) => {
          this.snackBar.open(err.error.message || 'Erro ao fazer login.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      })
  }

  register() {
    if (!this.consentLGPD) {
      this.snackBar.open('Você deve aceitar a política de privacidade (LGPD).', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (!this.registerName) {
      this.snackBar.open('Usuário é obrigatório.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }
    if (!this.fullName) {
      this.snackBar.open('Nome completo é obrigatório.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }
    if (!this.registerTelephone) {
      this.snackBar.open('Telefone é obrigatório.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (!this.registerEmail.includes('@')) {
      this.snackBar.open('E-mail inválido.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (!this.registerPassword) {
      this.snackBar.open('Senha é obrigatória.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (this.registerPassword !== this.confirmPassword) {
      this.snackBar.open('As senhas não são iguais.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.http
      .post<any>('http://localhost:3001/register', {
        name: this.registerName,
        fullName: this.fullName,
        email: this.registerEmail,
        password: this.registerPassword,
        telephone: this.registerTelephone
      })

      .subscribe({
        next: () => {
          this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.toggleMode();
        },
        error: (err) => {
          this.snackBar.open(err.error.message || 'Erro ao cadastrar.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        },
      });

  }
}
