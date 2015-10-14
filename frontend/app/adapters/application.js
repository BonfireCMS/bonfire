import DS from "ember-data";

export default DS.RESTAdapter.extend({
  host: window.location.origin,
  namespace: "bonfire/api/v1",

  shouldReloadAll() {
    return true;
  },

  shouldBackroundReloadRecord() {
    return false;
  }
});
