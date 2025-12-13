import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <Footer class="absolute bottom-0 w-full bg-gray-600 flex items-center justify-center h-12 px-4">
       <span class="text-sm text-white">
         &copy; {{ currentYear }} Designed By Tejiri Mayone. All rights reserved.
       </span>
    </Footer>
    
    `
})

export class AppFooterComponent implements OnInit {
    constructor() { }
    currentYear = new Date().getFullYear();

    ngOnInit() { }
}