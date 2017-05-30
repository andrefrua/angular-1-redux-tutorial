/**
 * To-do actions
 * Handles the information sent from the application to the Redux store
 */

/**
 * Importing the required files
 */
import {TODO_ACTIONS} from '../constants/todos';

/**
 * Adds a new Todo to the list, clean or with an error
 * @param {String} newTodo - Text to be added for the newly created To-do
 * @param {Boolean} hasError - Informs if there is an error or not
 * @return {Object}
 */
function addTodo(newTodo, typeId, hasError) {
  return {
    type: TODO_ACTIONS.ADD_TODO,
    payload: {
      text: newTodo,
      typeId: typeId,
      hasError: newTodo.toUpperCase().indexOf('ERROR') > -1,
    },
  };
}

/**
 *
 * @param {Number} id
 * @return {Object}
 */
function removeTodo(id) {
  return {
    type: TODO_ACTIONS.REMOVE_TODO,
    payload: id,
  };
}

/**
 * Marks or Unmarks all To-dos as done
 * @param {Boolean} mark - Flag informing if all To-do should be marked as done
 * @return {Object}
 */
function markAllAsDone(mark) {
  return {
    type: TODO_ACTIONS.MARK_ALL_AS_DONE,
    payload: mark,
  };
}

/**
 * Deletes all the To-dos that are marked as done
 * @return {Object}
 */
function deleteAllDone() {
  return {
    type: TODO_ACTIONS.REMOVE_ALL_DONE,
  };
}

/**
 * Toggle the option to see done To-dos on the main list
 * @return {Object}
 */
function toggleShowDone() {
  return {
    type: TODO_ACTIONS.TOGGLE_SHOW_DONE,
  };
}

/**
 * Toggles the done flag of the specigied to-do
 * @param {Number} id - Id of the To-do to toggle the done flag
 * @return {Object}
 */
function toggleDone(id) {
  return {
    type: TODO_ACTIONS.TOGGLE_DONE,
    payload: id,
  };
}

/**
 * Removes the error flag from the to-do with the received id
 * @param {Number} id - Id of the To-to do be cleaned
 * @return {Object}
 */
function cleanError(id) {
  return {
    type: TODO_ACTIONS.CLEAN_ERROR,
    payload: id,
  };
}

/**
 * Sets or removes the loading flag from the state
 * @param {Boolean} loading - Flag informing if the state should be loading or not
 * @return {Object}
 */
function setLoading(loading) {
  return {
    type: TODO_ACTIONS.SET_LOADING,
    payload: loading,
  };
}

/**
 * Sets the notification message
 * @param {String} message - Message to be set as the notification
 * @return {Object}
 */
function setNotification(message) {
  return {
    type: TODO_ACTIONS.SET_NOTIFICATION,
    payload: message,
  };
}

/**
 * Action simulating an Async request using thunk - It will call addTodo to actually create the
 * to-do
 * @param {*} secsToDelay - Amount of time to delay the operation in seconds
 * @param {*} newTodo - Text to add to the new to-do
 * @return {Object}
 */
function addTodoThunk(secsToDelay, newTodo, typeId) {
  return function(dispatch) {
    // First dispatch: Updates the app state to isLoading = true;
    dispatch(setLoading(true));

    setTimeout(function() {
      new Promise(function(resolve, reject) {
          dispatch(addTodo(newTodo, typeId));
          resolve('To-do created');
      }).then(function(result) {
        dispatch(setLoading(false));
      }).catch(function(error) {
        dispatch(setLoading(false));
      });
    }, secsToDelay * 1000);
  };
}

/**
 * Exports the function so that they can be used as actions
 */
export default {
  addTodo,
  removeTodo,
  markAllAsDone,
  deleteAllDone,
  toggleShowDone,
  toggleDone,
  cleanError,
  setLoading,
  addTodoThunk,
};
