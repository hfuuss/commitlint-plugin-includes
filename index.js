/** 封装规则函数, 让规则函数抛错时返回错误信息给 commitlint */
function ruleWrapper(fn) {
  return (...args) => {
    try {
      return fn(...args);
    } catch (err) {
      return [false, err.message];
    }
  };
}

module.exports = {
  rules: {
    "includes": ruleWrapper(require("./rules/includes"))
  }
};
