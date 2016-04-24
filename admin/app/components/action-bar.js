import Ember from 'ember';

export default Ember.Component.extend({
  globalActions: Ember.inject.service(),
  globalActionsType: Ember.computed("globalActions", function () {
    const forType = this.get("for");

    return this.get("globalActions.actionBar")[forType];
  }),
  tagName: "div",
  classNames: ["action-bar"],
  actions: {
    goTo() {
      const globalActionsType = this.get("globalActionsType");
      const action = globalActionsType.find(item => item.action === "goTo");
      const dataToSend = action.data.map(prop => {
        return this.get(prop.key);
      });

      this.sendAction(action.action, ...dataToSend);
    }
  }
});
