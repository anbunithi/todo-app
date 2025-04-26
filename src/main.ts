import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { todoReducer, todoFeatureKey } from './app/store/todo/todo.reducer';
import { TodoEffects } from './app/store/todo/todo.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    provideStore({ [todoFeatureKey]: todoReducer }),
    provideEffects([TodoEffects]),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
    })
  ]
}).catch(err => console.error(err));
