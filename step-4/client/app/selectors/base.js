import * as _ from 'lodash';

export const createCombinedSelector = (...args) => {
  let cachedParams = [];
  let cachedResult;
  let fn = args.pop();
  return ($$) => {
    let params = _.map(args, (arg) => _.isFunction(arg) ? arg.apply(null, [$$]) : arg);
    if (cachedResult && !_.some(cachedParams, (param, index) => param !== params[index])) {
      return cachedResult;
    }
    cachedParams = _.concat([], params);
    return cachedResult = fn(...params);
  };
};

export const createParametricSelectorGenerator = (fn) => {
  let cachedSelectors = {};
  let l = () => Object.keys(cachedSelectors);
  let d = (key) => delete cachedSelectors[key];
  let c = () => cachedSelectors = {};


  if (!_.isFunction(fn)) {
    return null;
  }

  let f = (param) => {
    if (_.isNil(param)) {
      return null;
    }
    if (!cachedSelectors[param]) {
      cachedSelectors[param] = fn.apply(null, [param]) || _.identity;
      cachedSelectors[param].$cache = {key: param, delete: () => d(param)};
    }

    return cachedSelectors[param];
  };
  f.$cache = {list: l, delete: d, clear: c};

  return f;
};

export const flattenSelectorAttributes = (selector, state) => {
  _.reduce(_.map(selector, function(fn, key) {
    return {[key]: fn(state)};
  }), _.merge, {});
};
