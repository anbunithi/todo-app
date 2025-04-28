import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { todoReducer, todoFeatureKey } from './store/todo/todo.reducer';
import { TodoEffects } from './store/todo/todo.effects';
import { TodoListComponent } from "./components/todo-list/todo-list.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(todoFeatureKey, todoReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([TodoEffects]),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        autoPause: true,
    }),
    TodoListComponent,
],
  providers: [],
  bootstrap: []
})
export class AppModule { }
