import Ember from "ember";

export default Ember.Controller.extend({
  isMobile: Ember.computed(() => document.documentElement.classList.contains("touch"))
});
