import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as TodoActions from './todo.actions';
import { Todo } from 'src/app/model/todo.model';

export const todoFeatureKey = 'todos';

export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  error: string | null;
}

export const todoAdapter = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: (a: Todo, b: Todo) => a.createdAt.getTime() - b.createdAt.getTime(),
});

export const initialState: TodoState = todoAdapter.getInitialState({
  loading: false,
  error: null,
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) =>
    todoAdapter.setAll(todos, { ...state, loading: false })
  ),
  on(TodoActions.addTodoSuccess, (state, { todo }) =>
    todoAdapter.addOne(todo, state)
  ),
  on(TodoActions.toggleTodoComplete, (state, { id }) => {
    const todo = state.entities[id];
    if (!todo) return state;
    
    return todoAdapter.updateOne({
      id,
      changes: { completed: !todo.completed }
    }, state);
  }),
  on(TodoActions.updateTodo, (state, { id, changes }) =>
    todoAdapter.updateOne({ id, changes }, state)
  ),
  on(TodoActions.deleteTodo, (state, { id }) =>
    todoAdapter.removeOne(id, state)
  )
);