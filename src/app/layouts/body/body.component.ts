import { Component, OnInit } from '@angular/core';
import { AppHeaderComponent } from '../header/header.component';
import { Products } from '../../features/products/products';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-body',
    template: `
    <div class="relative w-full bg-white dark:bg-gray-900 overflow-hidden flex flex-col min-h-screen">
        <app-header></app-header>  

        <div class="flex justify-center w-full grow overflow-y-auto"> 
            
            <div class="w-full sm:w-[85%] md:w-[90%] lg:w-[80%] bg-gray-300 dark:bg-gray-800 shadow">                
                <router-outlet />
            </div>

        </div>

        <app-footer></app-footer>
    </div>
    `,
    imports: [
        AppHeaderComponent,
        AppFooterComponent,
        RouterOutlet
    ]
})

export class AppBodyComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}