import {combineReducers} from 'redux';
import {TodosReducer} from './todos.reducer';
import {TypesReducer} from './types.reducer';

export const RootReducer = combineReducers({
  TodosState: TodosReducer,
  TypesState: TypesReducer,
});
