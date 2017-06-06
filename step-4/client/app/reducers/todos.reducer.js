import {TODO_ACTIONS} from '../constants/todos';

const initialState = {
  isLoading: false,
  notification: '',
  showDone: false,
  showType: '',
  todos: [
    {id: 1, text: 'First todo item', done: false, error: false, type: 2},
    {id: 2, text: 'Second todo item', done: false, error: false, type: 3},
    {id: 3, text: 'Todo with error', done: false, error: true, type: 2},
    {id: 4, text: 'Another item', done: false, error: false, type: 3},
  ],
};

/**
 * Reducer for the Todos
 * @param {*} state
 * @param {*} action
 * @return {Object}
 */
export function TodosReducer(state = initialState, action) {

  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(
          {
            id: createNewId(state.todos),
            text: action.payload.text,
            done: false,
            type: action.payload.typeId,
            error: action.payload.hasError,
          }),
        notification: action.payload.hasError ? 'Unable to add to-do' : 'To-do added',
      };

    case TODO_ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.payload),
          ...state.todos.slice(action.payload + 1),
        ],
        notification: 'To-do removed',
      };

    case TODO_ACTIONS.CHANGE_TYPE:
      return {
        ...state,
        todos: state.todos.map(function(todo) {
          return todo.id === action.payload.todoId ? {...todo, type: action.payload.typeId} : todo;
        }),
      };
    case TODO_ACTIONS.REMOVE_ALL_DONE:
      return {
        ...state,
        todos: state.todos.filter(function(todo) {
          return !todo.done;
        }),
        notification: 'Removed done to-dos',

      };
    case TODO_ACTIONS.MARK_ALL_AS_DONE:
      return {
        ...state,
        todos: state.todos.map(function(todo) {
          return {...todo, done: action.payload};
        }),
        notification: '',
      };

    case TODO_ACTIONS.TOGGLE_SHOW_DONE:
      return {
        ...state,
        showDone: !state.showDone,
        notification: '',
      };

    case TODO_ACTIONS.TOGGLE_DONE:
      return {
        ...state,
        todos: state.todos.map(function(todo) {
          return todo.id === action.payload ? {...todo, done: !todo.done} : todo;
        }),
        notification: '',
      };

    case TODO_ACTIONS.CLEAN_ERROR:
      return {
        ...state,
        todos: state.todos.map(function(todo) {
          return todo.id === action.payload ? {
            ...todo,
            text: todo.text.concat('*'),
            error: false,
          } : todo;
        }),
        notification: '',
      };

    case TODO_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case TODO_ACTIONS.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };

    default:
      return state;
  }
}
/**
 * Creates the Id for the new Todo
 * @param {Object} todos
 * @return {Object}
 */
function createNewId(todos) {
  let newId = Math.max(...todos.map(function(t) {
    return t.id;
  }));

  if (isNaN(parseInt(newId))) newId = 0;

  return ++newId;
}
