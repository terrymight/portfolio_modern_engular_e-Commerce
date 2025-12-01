import { Component, inject, OnInit, signal } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { LoginData } from '../../models/Login/LoginData.mode';
import { LoginService } from '../../service/login/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  private readonly loginService = inject(LoginService);
  private fb = inject(FormBuilder);
  
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit():void {
    if(this.loginForm.invalid) return;
    const formData = this.loginForm.value;
    this.error = null;
    const logindto: LoginData = {email: formData.email!, password: formData.password!}
    this.loading = true;
    this.loginService.login(logindto).subscribe({
      next: res => {
        // send user to dashboard
        this.loading = false;
      },
      error: error => { 
        this.loading = false;
        if (error.status == 401) {
          this.error = 'Invalid credentials or expired tokens';
        }
       },
    })
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
