import * as selectorsUtils from './base';

/**
 * Normal combined selectors
 */

const getAllTodos = (state) => state.TodosState.todos;
const getNoErrorTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => !todo.error));
const getDoneTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.done));
const getErrorTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.error));

/**
 * Parametric Selectors
 */

const getNoErrorTodosByTypeGenerator = selectorsUtils.createParametricSelectorGenerator(
  (typeId) => selectorsUtils.createCombinedSelector(
    getNoErrorTodos, (all) => (typeId > 0) ? all.filter((todo) => todo.type === parseInt(typeId)) : all
  )
);
const getDoneTodosByTypeGenerator = selectorsUtils.createParametricSelectorGenerator(
  (typeId) => selectorsUtils.createCombinedSelector(
    getDoneTodos, (doneTodos) => (typeId > 0) ? doneTodos.filter((todo) => todo.type === parseInt(typeId)) : doneTodos
  )
);
const getErrorTodosByTypeGenerator = selectorsUtils.createParametricSelectorGenerator(
  (typeId) => selectorsUtils.createCombinedSelector(
    getErrorTodos, (doneTodos) => (typeId > 0) ? doneTodos.filter((todo) => todo.type === parseInt(typeId)) : doneTodos
  )
);

/**
 * Defines the Selector object to be exported
 */
const TodoSelectors = {
  nonParametric: {
    allTodos: getAllTodos,
    noErrorTodos: getNoErrorTodos,
    doneTodos: getDoneTodos,
    errorTodos: getErrorTodos,
  },
  parametric: {},
};

let byType = {
  noErrorTodosByType: getNoErrorTodosByTypeGenerator,
  doneTodosByType: getDoneTodosByTypeGenerator,
  errorTodosByType: getErrorTodosByTypeGenerator,
};

Object.defineProperty(byType, '$cache', {
  get: function() {
    return {
      delete: (key) =>
        _.each(byType,
          (selector) => selector.$cache.delete(key)
        ),
      list: _.map(byType, (selector, key) => ({key: key, cachedList: selector.$cache.list()})),
    };
  },
});

TodoSelectors.parametric.type = byType;

export default TodoSelectors;
