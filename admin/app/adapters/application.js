import RESTAdapter from "ember-data/adapters/rest";

export default RESTAdapter.extend({
  host: window.location.origin,
  namespace: "api/v1"
});
