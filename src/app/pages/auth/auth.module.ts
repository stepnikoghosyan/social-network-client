import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { AuthRoutingModule } from './auth-routing.module';

// components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldModule } from '@common/modules/form-field/form-field.module';
import { PasswordFieldComponent } from '@common/components/password-field.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    // VerifyAccountComponent,
    // ForgotPasswordComponent,
    // ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormFieldModule,
    PasswordFieldComponent,
    MatCheckboxModule,
  ],
})
export class AuthModule {
}
