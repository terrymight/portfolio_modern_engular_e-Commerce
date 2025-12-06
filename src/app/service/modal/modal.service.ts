import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ModalService {
    dialogService$ = new BehaviorSubject<boolean>(false);

    getDialogState() {
        return this.dialogService$.asObservable();
    }

    openDialog() {
        this.dialogService$.next(true)
    }

    closeDialog() {
        this.dialogService$.next(false)
    }
}