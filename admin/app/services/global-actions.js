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
          action: "editPage",
          popover: [{
            icon: "external-link",
            action: "",
            text:"View page"
          }, {
            icon: "edit",
            action: "editPage",
            text:"Edit page"
          }, {
            icon: "trash",
            action: "",
            text:"Trash"
          }]
        }
      },
      "pages:edit": {
        actionBar: [{
          isIcon: "true",
          icon: "plus",
          action: "newPage"
        }, {
          isIcon: "true",
          icon: "trash",
          action: "destroyPage",
          color: "red"
        }],
        pageItem: {
        }
      },
      "pages:new": {
        actionBar: [],
        pageItem: {
        }
      },
      posts: {
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPost",
        }],
        pageItem: {
          action: "editPost",
          popover: [{
            icon: "external-link",
            action: "",
            text:"View post"
          }, {
            icon: "edit",
            action: "editPost",
            text:"Edit post"
          }, {
            icon: "trash",
            action: "",
            text:"Trash"
          }]
        }
      },
      "posts:edit": {
        actionBar: [{
          isIcon: "true",
          icon: "plus",
          action: "newPost"
        }, {
          isIcon: "true",
          icon: "trash",
          action: "",
          color: "red"
        }],
        pageItem: {
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
