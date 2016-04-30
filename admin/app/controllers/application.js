import Ember from "ember";

export default Ember.Controller.extend({
  isMobile: Ember.computed(function detectIsMobile() {
    return document.documentElement.classList.contains("touch");
  })
});
