import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoAdapter, TodoState, todoFeatureKey } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>(todoFeatureKey);

export const {
  selectAll: selectAllTodos,
  selectEntities: selectTodoEntities,
  selectIds: selectTodoIds,
  selectTotal: selectTodoTotal
} = todoAdapter.getSelectors(selectTodoState);

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  todos => todos.filter(todo => todo.completed)
);

export const selectActiveTodos = createSelector(
  selectAllTodos,
  todos => todos.filter(todo => !todo.completed)
);