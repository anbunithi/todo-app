import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/model/todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {
    // Initialize with some sample todos
    this.todos = [
      { id: uuidv4(), text: 'Learn Angular 19', completed: false, createdAt: new Date() },
      { id: uuidv4(), text: 'Master NgRx', completed: false, createdAt: new Date() },
      { id: uuidv4(), text: 'Build a todo app', completed: false, createdAt: new Date() }
    ];
  }

  getTodos(): Observable<Todo[]> {
    return of([...this.todos]);
  }

  addTodo(text: string): Observable<Todo> {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date()
    };
    this.todos = [...this.todos, newTodo];
    return of(newTodo);
  }

  updateTodo(id: string, changes: Partial<Todo>): Observable<Todo> {
    let updatedTodo: Todo | undefined;
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        updatedTodo = { ...todo, ...changes };
        return updatedTodo;
      }
      return todo;
    });
    return of(updatedTodo!);
  }

  deleteTodo(id: string): Observable<string> {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return of(id);
  }
}