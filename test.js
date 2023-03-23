function newOperator(ctor) {
  if (typeof ctor !== "function") {
    throw "param must be a function";
  }

  newOperator.target = ctor;
  var newObj = Object.create(ctor.prototype);
  var argsArr = [].slice.call(arguments, 1);
  var ctorReturnResult = ctor.apply(newObj, argsArr);
  var isObject =
    typeof ctorReturnResult === "object" && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === "function";
  if (isObject || isFunction) {
    return ctorReturnResult;
  }
  return newObj;
}
