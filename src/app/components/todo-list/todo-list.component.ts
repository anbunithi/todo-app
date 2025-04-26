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
    <div class="flex flex-col h-full w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden transition-all duration-300">
      <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 p-6">
        <h1 class="text-3xl font-bold text-white text-center mb-2">Todo List</h1>
        <p class="text-blue-100 text-center">Stay organized, be productive</p>
      </div>
      
      <div class="p-6 flex-grow w-full max-w-3xl mx-auto flex flex-col">
        <app-todo-form></app-todo-form>
        
        <div class="flex justify-center space-x-2 mb-6">
          <button 
            (click)="filterTodos('all')" 
            [class]="activeFilter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'" 
            class="px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            All
          </button>
          <button 
            (click)="filterTodos('active')" 
            [class]="activeFilter === 'active' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            Active
          </button>
          <button 
            (click)="filterTodos('completed')" 
            [class]="activeFilter === 'completed' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            Completed
          </button>
        </div>
        
        <div class="space-y-2 mb-4 flex-grow overflow-y-auto">
          @for (todo of filteredTodos$ | async; track todo.id) {
            <app-todo-item 
              [todo]="todo"
              (toggle)="toggleTodo($event)"
              (delete)="deleteTodo($event)">
            </app-todo-item>
          }
          @empty {
            <div class="text-center py-8 text-gray-500 dark:text-gray-400 italic">
              <p>No todos to display.</p>
              <p class="text-sm mt-2">Add a new task to get started!</p>
            </div>
          }
        </div>
        
        <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span>{{ (activeTodos$ | async)?.length || 0 }} items left</span>
          <span>{{ (completedTodos$ | async)?.length || 0 }} completed</span>
        </div>
      </div>
    </div>
  `,
  styles: []
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