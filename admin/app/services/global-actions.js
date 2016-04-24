import Ember from "ember";

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    // define a single action object
    const actions = {
      pages: {
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPage",
        }],
        pageItem: {
        },
        pageItemPopover: {
        }
      },
      "pages:new": {
        actionBar: [],
        pageItem: {
        },
        pageItemPopover: {
        }
      },
      posts: {
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPost",
        }],
        pageItem: {
        },
        pageItemPopover: {
        }
      },
      "posts:new": {
        actionBar: []
      },
      themes: {
        actionBar: []
      },
      settings: {
        actionbar: []
      }
    };

    Object.keys(actions).forEach(action => {
      this.set(action, actions[action]);
    });
  }
});
