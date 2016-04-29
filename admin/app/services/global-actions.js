import Ember from "ember";

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    // define a single action object
    const actions = {
      pages: {
        pageTitle: "Pages",
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPage"
        }],
        pageItem: {
          action: "editPage",
          popover: [{
            icon: "external-link",
            action: "",
            text: "View page"
          }, {
            icon: "edit",
            action: "editPage",
            text: "Edit page"
          }, {
            icon: "trash",
            action: "",
            text: "Trash"
          }]
        }
      },
      "pages:edit": {
        pageTitle: "Edit page",
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
        pageTitle: "New page",
        actionBar: [],
        pageItem: {
        }
      },
      "pages:loading": {
        actionBard: [{

        }]
      },
      posts: {
        pageTitle: "Posts",
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPost"
        }],
        pageItem: {
          action: "editPost",
          popover: [{
            icon: "external-link",
            action: "",
            text: "View post"
          }, {
            icon: "edit",
            action: "editPost",
            text: "Edit post"
          }, {
            icon: "trash",
            action: "",
            text: "Trash"
          }]
        }
      },
      "posts:edit": {
        pageTitle: "Edit Post",
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
        pageTitle: "New post",
        actionBar: []
      },
      "posts:loading": {
        actionBard: [{

        }]
      },
      themes: {
        pageTitle: "Themes",
        actionBar: []
      },
      settings: {
        pageTitle: "Settings",
        actionbar: []
      }
    };

    Object.keys(actions).forEach(action => {
      this.set(action, actions[action]);
    });
  }
});
