import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    template: `
    <nav class="absolute top-0 left-0 w-full h-20 bg-gray-600 z-10 flex items-center justify-between px-4">
      
      <h1 
      routerLink="/"
      class="text-white text-2xl font-bold cursor-pointer">Navigation Header</h1>
      
      <div class="flex items-center space-x-4">
          
          <div class="text-white h-6 w-6 cursor-pointer hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.824l.749 4.486-.027-.035-1.096-1.574A1.234 1.234 0 014.28 7.5h14.495c.782 0 1.417.635 1.417 1.417V20.25a1.417 1.417 0 01-1.417 1.417H4.28a1.417 1.417 0 01-1.417-1.417V8.917c0-.782.635-1.417 1.417-1.417zM15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
          </div>
          
          <div 
          routerLink="login"
          class="text-white h-6 w-6 cursor-pointer hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.5a2.25 2.25 0 01-1.423-1.807A6.75 6.75 0 0112 12a6.75 6.75 0 018.922 6.743 2.25 2.25 0 01-1.423 1.807H4.501z" />
              </svg>              
          </div>

          <button
          routerLink="login"
          class="cursor-pointer text-white px-4 py-1.5 rounded-lg text-sm font-medium transition duration-150">
              Login
          </button>
      </div>

  </nav>
    `,
    imports: [
        RouterLink,
    ],
})

export class AppHeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}