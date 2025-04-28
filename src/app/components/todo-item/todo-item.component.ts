import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="group flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
      <div class="flex items-center justify-center">
        <input 
          type="checkbox" 
          [checked]="todo.completed" 
          (change)="onToggle()" 
          id="todo-{{todo.id}}"
          class="h-5 w-5 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
        />
      </div>
      
      <label 
        for="todo-{{todo.id}}" 
        class="ml-3 flex-grow cursor-pointer font-medium text-gray-700 dark:text-gray-200"
        [class.line-through]="todo.completed"
        [class.text-gray-400]="todo.completed"
      >
        {{ todo.text }}
      </label>
      
      <button 
        (click)="onDelete()"
        class="ml-2 p-1 text-red-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  `,
  styles: []
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() itemClicked = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onToggle() {
    this.itemClicked.emit(this.todo.id);
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}