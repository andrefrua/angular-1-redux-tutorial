import * as selectorsUtils from './base';

const getAllTodos = (state) => state.TodosState.todos;
const getNoErrorsTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => !todo.error));
const getDoneTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.done));
const getErrorTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.error));
const countAllTodos = selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.length);
const countDoneTodos = selectorsUtils.createCombinedSelector(getDoneTodos, (done) => done.length);
const countErrorTodos = selectorsUtils.createCombinedSelector(getErrorTodos, (error) => error.length);


const getAllTodosByTypeGenerator = selectorsUtils.createParametricSelectorGenerator(
  (typeId) => selectorsUtils.createCombinedSelector(getAllTodos, (all) => all.filter((todo) => todo.type === parseInt(typeId)))
);


export default {
  getAllTodos,
  getNoErrorsTodos,
  getDoneTodos,
  getErrorTodos,
  countAllTodos,
  countDoneTodos,
  countErrorTodos,
  getAllTodosByTypeGenerator,
};
