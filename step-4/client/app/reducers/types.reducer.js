import {TYPE_ACTIONS} from '../constants/types';

const initialState = {
  types: [
    {id: 1, text: 'Default'},
    {id: 2, text: 'Home'},
    {id: 3, text: 'Work'},
  ],
};

/**
 * Reducer for the Types
 * @param {*} state
 * @param {*} action
 * @return {Object}
 */
export function TypesReducer(state = initialState, action) {

  switch (action.type) {
    case TYPE_ACTIONS.ADD_TYPE:
      return {
        ...state,
        types: state.types.concat(
          {
            id: createNewId(state.types),
            text: action.payload.text,
            done: false,
            error: action.payload.hasError,
          }),
        notification: action.payload.hasError ? 'Unable to add to-do' : 'Type added',
      };

    case TYPE_ACTIONS.REMOVE_TYPE:
      return {
        ...state,
        types: state.types.filter((type) => type.id !== action.payload),
        notification: 'Type removed',
      };

    default:
      return state;
  }
}
/**
 * Creates the Id for the new Type
 * @param {Object} types
 * @return {Object}
 */
function createNewId(types) {
  let newId = Math.max(...types.map(function(t) {
    return t.id;
  }));

  if (isNaN(parseInt(newId))) newId = 0;

  return ++newId;
}
