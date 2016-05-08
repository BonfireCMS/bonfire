import Mirage from "ember-cli-mirage";

export default Mirage.Factory.extend({
  name() {
    return this.title.toLowerCase().dasherize();
  },
  status: "draft"
});
