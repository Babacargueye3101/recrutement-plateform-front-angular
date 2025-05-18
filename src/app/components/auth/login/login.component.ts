import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class LoginComponent {
  activeTab: 'login' | 'register' = 'login';
  role: 'admin' | 'candidate' = 'candidate';

  // États pour le formulaire de connexion
  loginEmail = '';
  loginPassword = '';
  loginError = '';
  isLoggingIn = false;

  // États pour le formulaire d'inscription
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';
  registerCompany = '';
  registerPosition = '';
  registerError = '';
  isRegistering = false;

  constructor(private authService: AuthService, private router: Router) {}

  async handleLogin(e: Event) {
    e.preventDefault();
    this.loginError = '';
    this.isLoggingIn = true;

    try {
      const success = await this.authService.login(this.loginEmail, this.loginPassword, this.role);
      if (success) {
        this.router.navigate([this.role === 'admin' ? '/admin/dashboard' : '/dashboard']);
      } else {
        this.loginError = 'Identifiants incorrects ou compte non trouvé';
      }
    } catch (error) {
      this.loginError = 'Une erreur est survenue. Veuillez réessayer.';
    } finally {
      this.isLoggingIn = false;
    }
  }

  async handleRegister(e: Event) {
    e.preventDefault();
    this.registerError = '';
    this.isRegistering = true;

    // Validation
    if (!this.registerName.trim()) {
      this.registerError = 'Le nom complet est requis';
      this.isRegistering = false;
      return;
    }

    if (!this.registerEmail.includes('@')) {
      this.registerError = 'Veuillez entrer un email valide';
      this.isRegistering = false;
      return;
    }

    if (this.registerPassword.length < 6) {
      this.registerError = 'Le mot de passe doit contenir au moins 6 caractères';
      this.isRegistering = false;
      return;
    }

    if (this.registerPassword !== this.registerConfirmPassword) {
      this.registerError = 'Les mots de passe ne correspondent pas';
      this.isRegistering = false;
      return;
    }

    if (this.role === 'admin' && !this.registerCompany) {
      this.registerError = 'Le nom de l\'entreprise est requis pour les recruteurs';
      this.isRegistering = false;
      return;
    }

    try {
      const success = await this.authService.register(
        this.registerName,
        this.registerEmail,
        this.registerPassword,
        this.role,
        this.registerCompany,
        this.registerPosition
      );

      if (success) {
        this.router.navigate([this.role === 'admin' ? '/admin/onboarding' : '/onboarding']);
      } else {
        this.registerError = 'Cette adresse email est peut-être déjà utilisée';
      }
    } catch (error) {
      this.registerError = 'Une erreur est survenue. Veuillez réessayer.';
    } finally {
      this.isRegistering = false;
    }
  }

  setActiveTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  setRole(role: 'admin' | 'candidate') {
    this.role = role;
  }
}