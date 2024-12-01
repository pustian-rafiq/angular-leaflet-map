import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './signin/signin.component';

export const authRoutes: Routes = [
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
];
