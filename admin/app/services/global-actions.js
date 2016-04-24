import Ember from "ember";

export default Ember.Service.extend({
  pageListItem: null,
  postListItem: null,
  pageItem: null,

  init() {
    this._super(...arguments);
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
