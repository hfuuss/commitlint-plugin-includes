const includes = require('./index');
module.exports = {
  plugins: [includes],
  rules: {
    "includes": [2, "always"]
  }
};
