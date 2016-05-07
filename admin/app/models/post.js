import Model from "ember-data/model";
import attr from "ember-data/attr";

export default Model.extend({
  content: attr("string"),
  createdAt: attr("date"),
  markdown: attr("string"),
  name: attr("string"),
  route: attr("string"),
  status: attr("string"),
  title: attr("string"),
  updatedAt: attr("date")
});
