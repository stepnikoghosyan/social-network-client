import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';

// dto
import { LoginDto } from '../../models/dto/login.dto';

// models
import { AppRoutes } from '@common/models/app-routes.model';

// validators
import { emailValidator } from '../../validators/email.validator';

// utils
import { getFullRoute } from '@common/utils/get-full-route.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public readonly form: FormGroup;

  public isLoading = false;
  public responseErrorMsg: string | null = null;

  private subscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.responseErrorMsg = null;

    this.form.disable();

    this.subscription = this.authService.login(new LoginDto(this.form.value), this.form.value.rememberMe)
      .subscribe({
        next: () => {
          this.router.navigate([getFullRoute(AppRoutes.Home)]);
        },
        error: (err: HttpErrorResponse) => {
          this.responseErrorMsg = (err.error as any).message || 'Unknown error occurred'; // TODO: api error response type
          this.form.enable();
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
