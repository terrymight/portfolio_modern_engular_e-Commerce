import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast/toast.service';

@Component({
    standalone: true,
    imports: [],
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboadComponent implements OnInit {
    private toast = inject(ToastService);

    ngOnInit() { }
}