import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../service/modal/modal.service';
import { Store } from '@ngrx/store';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import * as UserActions from '../../store/users/user.actions';
import * as UserSelectors from '../../store/users/user.selectors';
import { CreateUserDto, ServerError } from '../../models/user/user.model';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';

@Component({
    standalone: true,
    selector: 'user-registration',
    templateUrl: './user-registration.component.html',
    imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    CommonModule,
    Toast
],
})

export class UserRegistrationComponent implements OnInit, OnDestroy {
    
    private destroy$ = new Subject<void>();
    private dialogService = inject(ModalService);
    private store = inject(Store as any as new () => Store<any>);
    private fb = inject(FormBuilder);

    // Selectors
    
    serverError$ = this.store.select(UserSelectors.selectUserError)

    visible = false;
    // reactive form
    signupForm!: FormGroup;
    value = '';

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit() {
        this.loadForm();
        this.listenForModalState();
        this.serverError$.pipe(
            takeUntil(this.destroy$)
            ).subscribe((error:ServerError) => {
            if (error) {
                // Ensure form errors are cleared before setting new ones
                this.signupForm.setErrors(null);
                
                // 1. Handle Field-Specific Errors (e.g., status 422)
                if (error.fieldErrors) {
                Object.keys(error.fieldErrors).forEach(fieldKey => {
                    const control = this.signupForm.get(fieldKey);
                    
                    if (control && error.fieldErrors) {
                    // Set the first error message from the server on the control
                    // We use a custom error key 'serverError'
                    control.setErrors({ 
                        serverError: error.fieldErrors[fieldKey][0] 
                    });
                    }
                });
                }
                console.log(error)
                // 2. Handle Global Errors (e.g., 401, 500)
                // Set the global message on the Form Group itself
                this.signupForm.setErrors({ 
                globalError: error.globalMessage 
                });
            }
            });
     }

    closeDialog() {
        this.dialogService.closeDialog()
    }

    private listenForModalState(): void {
    this.dialogService
        .getDialogState()
        .pipe(takeUntil(this.destroy$))
        .subscribe(v => {
            this.loadForm();
            this.visible = v;
        })
    }

    loadForm():void {
        if (this.signupForm) return;
        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.minLength(5), Validators.required])],
            avatar: ['']
        });
    }

    registerNewUser(): void {
        if (this.signupForm.invalid) {
            this.signupForm.markAsDirty();
            return;
        };
        const v: CreateUserDto = this.signupForm.value;
        const dto:CreateUserDto = {
            name: v.name,
            email: v.email,
            password: v.password,
            avatar: v.avatar
        };

        this.store.dispatch(UserActions.addUser({ userDto: dto }))
    }
}