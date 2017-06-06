import * as selectorsUtils from './base';

/**
 * Combined selectors
 */

const getAllTodos = (state) => state.TodosState.todos;
const getNoErrorsTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => !todo.error));
const getDoneTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.done));
const getErrorTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.error));

/**
 * Parametric Selectors
 */

const getNoErrorTodosByTypeGenerator = selectorsUtils.createParametricSelectorGenerator(
  (typeId) => selectorsUtils.createCombinedSelector(
    getNoErrorsTodos, (all) => (typeId > 0) ? all.filter((todo) => todo.type === parseInt(typeId)) : all
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

export default {
  getNoErrorTodosByTypeGenerator,
  getDoneTodosByTypeGenerator,
  getErrorTodosByTypeGenerator,
};
