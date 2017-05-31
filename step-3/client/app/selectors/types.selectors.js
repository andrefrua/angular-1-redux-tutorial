import * as selectorsUtils from './base';

const getAllTypes = (state) => state.TypesState.types;
const countAllTypes = selectorsUtils.createCombinedSelector(getAllTypes, (all) => all.length);

export default {
  getAllTypes,
  countAllTypes,
};
