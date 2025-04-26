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
    <form (ngSubmit)="addTodo()" class="todo-form">
      <input 
        type="text" 
        [(ngModel)]="todoText" 
        name="todoText" 
        placeholder="What needs to be done?"
        required
        autocomplete="off"
      />
      <button type="submit" [disabled]="!todoText.trim()">Add</button>
    </form>
  `,
  styles: [`
    .todo-form {
      display: flex;
      margin-bottom: 20px;
    }
    .todo-form input {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    .todo-form button {
      padding: 10px 15px;
      background-color: #1976d2;
      color: white;
      border: 1px solid #1976d2;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    .todo-form button:disabled {
      background-color: #ccc;
      border-color: #ccc;
      cursor: not-allowed;
    }
  `]
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