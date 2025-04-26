import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-item" [class.completed]="todo.completed">
      <input 
        type="checkbox" 
        [checked]="todo.completed" 
        (change)="onToggle()" 
        id="todo-{{todo.id}}"
      />
      <label for="todo-{{todo.id}}">{{ todo.text }}</label>
      <button class="delete-btn" (click)="onDelete()">×</button>
    </div>
  `,
  styles: [`
    .todo-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
      animation: fadeIn 0.3s;
    }
    .todo-item.completed label {
      text-decoration: line-through;
      color: #888;
    }
    .todo-item input[type="checkbox"] {
      margin-right: 10px;
    }
    .todo-item label {
      flex-grow: 1;
      cursor: pointer;
    }
    .delete-btn {
      background: none;
      border: none;
      color: #ff5555;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    .delete-btn:hover {
      opacity: 1;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onToggle() {
    this.toggle.emit(this.todo.id);
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}
