/* eslint-disable no-invalid-this, prefer-arrow-callback */
import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function routerMap() {
  // pages
  this.route("pages", function pagesRoute() {
    this.route("edit", { path: "/:id/edit" });
    this.route("new", { path: "/new" });
    this.route("show", { path: "/:id" });
  });

  // posts
  this.route("posts", function postsRoute() {
    this.route("edit", { path: "/:id/edit" });
    this.route("new", { path: "/new" });
    this.route("show", { path: "/:id" });
  });

  // settings
  this.route("settings");

  // themes
  this.route("themes", function themesRoute() {});
});

export default Router;
