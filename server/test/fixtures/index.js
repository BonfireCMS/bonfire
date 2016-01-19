"use strict";

import path from "path";

let post1 = {
  content: "foo",
  type: "post"
};

let post2 = {
  type: "page"
};

export default {
  config: path.resolve(__dirname, "config/config.js"),
  post1,
  post2
}
