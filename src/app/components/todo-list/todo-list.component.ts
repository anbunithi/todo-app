import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/model/todo.model';
import * as TodoActions from '../../store/todo/todo.actions';
import * as TodoSelectors from '../../store/todo/todo.selectors';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent, TodoFormComponent],
  template: `
    <div class="todo-container">
      <h1>Todo List</h1>
      <h1 class="text-3xl font-bold text-cyan-300 underline">
  Hello User
</h1>
      <app-todo-form></app-todo-form>
      
      <div class="filters">
        <button (click)="filterTodos('all')" [class.active]="activeFilter === 'all'">All</button>
        <button (click)="filterTodos('active')" [class.active]="activeFilter === 'active'">Active</button>
        <button (click)="filterTodos('completed')" [class.active]="activeFilter === 'completed'">Completed</button>
      </div>
      
      <div class="todo-list">
        @for (todo of filteredTodos$ | async; track todo.id) {
          <app-todo-item 
            [todo]="todo"
            (toggle)="toggleTodo($event)"
            (delete)="deleteTodo($event)">
          </app-todo-item>
        }
        @empty {
          <p class="empty-state">No todos to display.</p>
        }
      </div>
      
      <div class="todo-stats">
        <span>{{ (activeTodos$ | async)?.length || 0 }} items left</span>
      </div>
    </div>
  `,
  styles: [`
    .todo-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .filters {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      gap: 10px;
    }
    .filters button {
      background: none;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
    }
    .filters button.active {
      background-color: #1976d2;
      color: white;
      border-color: #1976d2;
    }
    .todo-list {
      margin-top: 20px;
    }
    .todo-stats {
      margin-top: 20px;
      color: #777;
      font-size: 14px;
    }
    .empty-state {
      text-align: center;
      color: #777;
      font-style: italic;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  activeTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;
  filteredTodos$: Observable<Todo[]>;
  activeFilter = 'all';

  constructor(private store: Store) {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.activeTodos$ = this.store.select(TodoSelectors.selectActiveTodos);
    this.completedTodos$ = this.store.select(TodoSelectors.selectCompletedTodos);
    this.filteredTodos$ = this.todos$;
  }

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
    this.filterTodos('all');
  }

  filterTodos(filter: string) {
    this.activeFilter = filter;
    switch (filter) {
      case 'active':
        this.filteredTodos$ = this.activeTodos$;
        break;
      case 'completed':
        this.filteredTodos$ = this.completedTodos$;
        break;
      default:
        this.filteredTodos$ = this.todos$;
    }
  }

  toggleTodo(id: string) {
    this.store.dispatch(TodoActions.toggleTodoComplete({ id }));
  }

  deleteTodo(id: string) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
}