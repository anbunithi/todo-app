import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../store/todo/todo.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="addTodo()" class="flex mb-6">
      <input 
        type="text" 
        [(ngModel)]="todoText" 
        name="todoText" 
        placeholder="What needs to be done?"
        required
        autocomplete="off"
        class="flex-grow px-4 py-3 rounded-l-lg border-2 border-r-0 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors duration-200"
      />
      <button 
        type="submit" 
        [disabled]="!todoText.trim()"
        class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium rounded-r-lg transition-all duration-200 hover:from-indigo-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>
  `,
  styles: []
})
export class TodoFormComponent {
  todoText = '';

  constructor(private store: Store) {}

  addTodo() {
    if (this.todoText.trim()) {
      this.store.dispatch(TodoActions.addTodo({ text: this.todoText.trim() }));
      this.todoText = '';
    }
  }
}