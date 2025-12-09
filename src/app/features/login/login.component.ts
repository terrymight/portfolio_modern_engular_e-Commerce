import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { LoginData } from '../../models/Login/LoginData.mode';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthError, selectIsLoading } from '../../store/login/user.selectors';
import { AuthActions } from '../../store/login/login.actions';
import { ModalService } from '../../service/modal/modal.service';
import { Subject, takeUntil } from 'rxjs';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-login.component',
  imports: [UserRegistrationComponent, PasswordModule, ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy{
  private fb = inject(FormBuilder);
  private store = inject(Store as any as new () => Store<any>); // replace `any` with your AppState type if available
  private dialogService = inject(ModalService);

  // Selectors
  loading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectAuthError);

  // reactive form
  loginForm!: FormGroup;


  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // match your error messaging (minLength referenced in getter)
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formData: LoginData = this.loginForm.value;
    this.store.dispatch(
      AuthActions.login({
        request: { email: formData.email, password: formData.password },
      })
    );
  }

  openDialog(): void {
    this.dialogService.openDialog();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get emailInvalid(): boolean {
    const c = this.loginForm.get('email');
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  get passwordInvalid(): boolean {
    const c = this.loginForm.get('password');
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  get emailErrorMessage(): string {
    const c = this.loginForm.get('email');
    if (!c) return '';
    if (c.hasError('required')) return 'Email is required.';
    if (c.hasError('email')) return 'Please enter a valid email address.';
    return '';
  }

  get passwordErrorMessage(): string {
    const c = this.loginForm.get('password');
    if (!c) return '';
    if (c.hasError('required')) return 'Password is required.';
    if (c.hasError('minlength')) return 'Password must be at least 6 characters.';
    return '';
  }
}
