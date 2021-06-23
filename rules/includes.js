const assert = require("assert");

/**
 * 所有可以用来校验提交信息的位置
 * @see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser
 */
const availablePositions = ["subject", "header", "body", "footer"];

function parsePositions(positions = null) {
  assert(positions == null || Array.isArray(positions), "positions 选项必须是一个数组");
  if (positions == null || positions.length === 0) return ["raw"];

  const invalidPositions = positions.filter((pos) => availablePositions.indexOf(pos) === -1);
  assert(invalidPositions.length === 0, `无效的 positions 选项: ${invalidPositions.join(", ")}`);

  return positions;
}

function parseOptions(options = {}) {
  return {
    /** 要校验提交信息的位置, 默认只需要在任意位置包含 正则 信息即可 */
    positions: parsePositions(options.positions),

    /** 正则表达式 */
    reg: options.reg ? options.reg : new RegExp(/.*/)
  };
}

module.exports = (parsed, _, options) => {
  const { positions, reg } = parseOptions(options);
  const messages = positions.map((pos) => String(parsed[pos]));
  const result = messages.filter(msg => reg.test(msg))

  return [result.length > 0, `没有匹配到正则${reg}`];
};
