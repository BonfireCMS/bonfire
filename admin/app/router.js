import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType
});

/* eslint-disable prefer-arrow-callback */
Router.map(function routerMap() {
});

/* eslint-enable prefer-arrow-callback */

export default Router;
