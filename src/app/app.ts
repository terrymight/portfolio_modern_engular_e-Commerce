import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/login/login.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ngrx-store';
  private store = inject(Store);

  ngOnInit(): void {
  // Dispatch this action once when the application loads
  this.store.dispatch(AuthActions.checkLocalStorage());
}
}
