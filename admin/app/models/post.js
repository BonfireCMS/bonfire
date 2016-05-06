import Model from "ember-data/model";
import attr from "ember-data/attr";

export default Model.extend({
  name: attr("string"),
  content: attr("string"),
  route: attr("string"),
  createdAt: attr("date"),
  updatedAt: attr("date"),
  status: attr("string"),
  markdown: attr("string")
});
