/* eslint-disable no-invalid-this, prefer-arrow-callback */
import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function routerMap() {
  this.route("posts", function postsRoute() {
    this.route("edit", { path: "/:id/edit" });
    this.route("new", { path: "/new" });
    this.route("show", { path: "/:id" });
  });
  this.route("settings");
  this.route("pages", function() {
    this.route("edit", { path: "/:id/edit" });
    this.route("new", { path: "/new" });
    this.route("show", { path: "/:id" });
  });
  this.route("themes", function() {});
});

export default Router;
