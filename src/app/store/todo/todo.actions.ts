import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/model/todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[] }>());
export const addTodo = createAction('[Todo] Add Todo', props<{ text: string }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());
export const toggleTodoComplete = createAction('[Todo] Toggle Todo Complete', props<{ id: string }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ id: string, changes: Partial<Todo> }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string }>());
