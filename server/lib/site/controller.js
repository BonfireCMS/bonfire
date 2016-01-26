"use strict";

const fs = require("fs");
const path = require("path");
const stat = fs.stat;
const url = require("url");

const _ = require("lodash");
const errors = require("restify-errors");
const routeMatch = require("path-match")();

const config = require("../config");
const Post = require("../models").Post;
const Setting = require("../models").Setting;

class SiteController {
  constructor() {
  }

  index(req, res, next) {
    req.params = req.params || {};

    let viewOpts = {
      name: "index"
    };

    if (req.params.pageSlug) { viewOpts.name = "page"; }
    let view = getViewForType(req.app.get("activeTheme"), viewOpts);
    /**
     * TODO: pull setting for frontPageType and id
     * if frontPageType = page serve frontpage post
     * if frontPageType = blog serve paginated posts
     */
    res.render(view, { foo: "bar" });
  }

  page(req, res, next) {
    const pathName = url.parse(req.path).pathname;
    const match = routeMatch("/:slug");
    const slugMatch = match(pathName);


    /**
     * pull settings to find blog page id
     * pull post matching this slug
     * check if blog id and slug id match
     * if match, pull all posts and render with those
     * if no match, render the slug post
     */
    Setting.find(keyQuery("blogPage")).then(blogPage => {
      return Post.find(slugQuery(slugMatch.slug)).then(post => {
        if (post) {
          let isBlog = parseInt(blogPage.value, 10) === post.id;

          if (isBlog) {
            // pull posts and set context with all
            return Post.findAll().then(posts => {
              return setContext("blog", { post: post, posts: posts });
            });
          } else {
            // return this slug only for context
            return setContext("page", post);
          }
        } else {
          throw new errors.ResourceNotFoundError(`Page '${slugMatch.slug}' does not exist`);
        }
      });
    }).then(context => {
      const viewOpts = {
        name: context.type
      };

      let view = getViewForType(req.app.get("activeTheme"), viewOpts);
      res.render(view, context.data);
    }).catch(next);
  }
}

function setContext(type, data) {
  return {
    type: type,
    data: data
  };
}

function slugQuery(slug) {
  return {
    where: {
      name: slug
    }
  };
}

function getViewForType(activeTheme, options) {
  let activeThemeViews = config.get("paths.themes")[activeTheme].views;
  let allowedViews = ["index"];

  let viewConfig = VIEW_CONFIG[options.name];

  if (viewConfig.name && viewConfig.name !== "index") {
    allowedViews.unshift(viewConfig.name);
  }

  if (viewConfig.frontPage) {
    allowedViews.unshift(viewConfig.frontPage);
  }

  let template = _.find(allowedViews, view => activeThemeViews.hasOwnProperty(view + ".hbs"));

  if (!template) {
    template = activeThemeViews[_.last(allowedViews) + ".hbs"];
  }

  return template;
}

const VIEW_CONFIG = {
  blog: {
    name: "blog"
  },
  index: {
    name: "index",
    route: "/",
    frontPage: "home"
  },
  page: {
    name: "page",
    route: "/:pageSlug"
  }
};

function keyQuery(key) {
  return {
    where: { key: key }
  };
}

module.exports = SiteController;
