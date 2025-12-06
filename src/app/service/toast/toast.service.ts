import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({providedIn: 'root'})
export class ToastService {
    private messageSevice = inject(MessageService);

    success(params: {
        summary: string;
        message: string;
    }):void {
        this.messageSevice.add({
            severity: 'success',
            summary: params.summary,
            detail: params.message,
            life: 3000,
            closable: true,
        });
    }

    info(params: {
        summary: string;
        message: string;
    }):void {
        this.messageSevice.add({
            severity: 'info',
            summary: params.summary,
            detail: params.message,
            life: 3000,
            closable: true,
        });
    }

    warn(params: {
        summary: string;
        message: string;
    }):void {
        this.messageSevice.add({
            severity: 'warn',
            summary: params.summary,
            detail: params.message,
            life: 3000,
            closable: true,
        });
    }   

    error(params: {
        summary: string;
        message: string;
    }):void {
        this.messageSevice.add({
            severity: 'error',
            summary: params.summary,
            detail: params.message,
            life: 3000,
            closable: true,
        });
    }   
}