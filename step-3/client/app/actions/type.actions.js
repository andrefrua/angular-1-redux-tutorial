/**
 * Type actions
 * Handles the information sent from the application to the Redux store
 */

/**
 * Importing the required files
 */
import {TYPE_ACTIONS} from '../constants/types';

/**
 * Adds a new Todo to the list, clean or with an error
 * @param {String} newType - Text to be added for the newly created To-do
 * @param {Boolean} hasError - Informs if there is an error or not
 * @return {Object}
 */
function addType(newType, hasError) {
  return {
    type: TYPE_ACTIONS.ADD_TYPE,
    payload: {
      text: newType,
      hasError: newType.toUpperCase().indexOf('ERROR') > -1,
    },
  };
}

/**
 *
 * @param {Number} id
 * @return {Object}
 */
function removeType(id) {
  return {
    type: TYPE_ACTIONS.REMOVE_TYPE,
    payload: id,
  };
}


/**
 * Exports the function so that they can be used as actions
 */
export default {
  addType,
  removeType,
};
