const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    "ember-cli-mocha": {
      useLintTree: false
    },
    emberCliFontAwesome: {
      useScss: true
    }
  });

  return app.toTree();
};
