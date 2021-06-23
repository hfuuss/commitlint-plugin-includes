# @lippzhang/commitlint-plugin-includes

按照 [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) 校验你的提交记录

## 教程

在使用前请先确保在你的机器上 [Node.js](https://nodejs.org) [npm](https://www.npmjs.com/)已经安装好了！！

首先在项目根目录中安装依赖

```bash
$ npm i -D husky @commitlint/cli @lippzhang/commitlint-plugin-includes
```

然后项目根目录下的在 package.json 中添加以下配置：

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "commitlint": {
    "plugins": ["@lippzhang/commitlint-plugin-includes"],
    "rules": {
      "includes": [2, "always"]
    }
  }
}
```

这样在本地提交的时候就可以校验提交信息了。如果有需要自定义校验选项，请参考下方的规则文档。

## 规则

### includes

要求提交记录中包含正则的信息（默认为/.*/）。


可选项：

* **positions**：允许添加 正则 信息的位置。具体有哪些位置可以参考 [conventional-commits-parser](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser)，但在这里只能选择 subject、header、body、footer 中的若干个，当一个都不选择时表示可以在任意位置添加正则信息
* **reg**：传入的正则表达式，默认/.*/

样例配置：

* 默认配置：msg信息必须包含 --bugid= 字段

  ```json
  {
    "includes": [2, "always", {"reg": /--bugid=/}]
  }
  ```

* 只允许在非首行位置添加正则信息

  ```json
  {
    "includes": [2, "always", { "positions": ["body", "footer"], "reg": /--bugid=/ }]
  }
  ```

* 只允许在首行添加正则信息：

  ```json
  {
    "includes": [2, "always", { "positions": ["header"], "reg": /--bugid=/ }]
  }
  ```

* 关闭本规则：

  ```json
  {
    "includes": [0]
  }
  ```

## License

MIT
