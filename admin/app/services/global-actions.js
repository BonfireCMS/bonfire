import Ember from "ember";

export default Ember.Service.extend({
  actionBar: null,
  pageListItem: null,
  postListItem: null,
  pageItem: null,

  init() {
    this._super(...arguments);
    // set up action bar
    this.set("actionBar", {
      pages: [{
        "new": "pages.new",
        icon: "plus",
        action: "goTo",
        data: [{
          key: "globalActions.actionBar.pages.0.new"
        }]
      }],
      posts: [{
        "new": "posts.new",
        icon: "plus",
        action: "goTo",
        data: [{
          key: "globalActions.actionBar.posts.0.new"
        }]
      }]
    });

    // set up page list actions
    this.set("pageListItem", [{
      icon: "external-link",
      text: "View",
    }, {
      icon: "edit",
      text: "Edit",
      action: ""
    }, {
      icon: "trash",
      text: "Trash",
      action: ""
    }]);

    // set up post list actions
    this.set("postListItem", [{
      icon: "external-link",
      text: "View",
    }, {
      icon: "edit",
      text: "Edit",
      action: ""
    }, {
      icon: "trash",
      text: "Trash",
      action: ""
    }]);

    // set up pageItem component actions
    const pageItem = {
      "page-list": {
        edit: "pages.edit",
        action: "goTo",
        data: [{
          key: "globalActions.pageItem.page-list.edit"
        }, {
          key: "post.id"
        }]
      },
      "post-list": {
        edit: "posts.edit",
        action: "goTo",
        data: [{
          key: "globalActions.pageItem.post-list.edit"
        }, {
          key: "post.id"
        }]
      }
    };
    this.set("pageItem", pageItem);
  }
});
