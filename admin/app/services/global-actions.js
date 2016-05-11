import Ember from "ember";

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    // define a single action object
    const actions = {
      dashboard: {
        pageTitle: "",
        actionBar: []
      },
      pages: {
        pageTitle: "Pages",
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPage"
        }],
        postItem: {
          action: "editPage",
          popover: [{
            icon: "external-link",
            action: "openExternalLink",
            text: "View page"
          }, {
            icon: "edit",
            action: "editPage",
            text: "Edit page"
          }, {
            icon: "thumbs-o-up",
            action: "publish",
            text: "Publish page"
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
          icon: "check-square-o",
          color: "green",
          action: "savePage"
        }],
        postItem: {
        }
      },
      "pages:new": {
        pageTitle: "New page",
        actionBar: [{
          isIcon: "true",
          icon: "check-square-o",
          color: "green",
          action: "savePage"
        }],
        postItem: {
        }
      },
      "pages:loading": {
        actionBar: [{

        }]
      },
      posts: {
        pageTitle: "Posts",
        actionBar: [{
          isIcon: true,
          icon: "plus",
          action: "newPost"
        }],
        postItem: {
          action: "editPost",
          popover: [{
            icon: "external-link",
            action: "openExternalLink",
            text: "View post"
          }, {
            icon: "edit",
            action: "editPost",
            text: "Edit post"
          }, {
            icon: "thumbs-o-up",
            action: "publish",
            text: "Publish page"
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
          icon: "check-square-o",
          color: "green",
          action: "savePost"
        }],
        postItem: {
        }
      },
      "posts:new": {
        pageTitle: "New post",
        actionBar: [{
          isIcon: "true",
          icon: "check-square-o",
          color: "green",
          action: "savePost"
        }]
      },
      "posts:loading": {
        actionBar: [{

        }]
      },
      themes: {
        pageTitle: "Themes",
        actionBar: []
      },
      settings: {
        pageTitle: "Settings",
        actionBar: []
      }
    };

    Object.keys(actions).forEach(action => {
      this.set(action, actions[action]);
    });
  }
});
