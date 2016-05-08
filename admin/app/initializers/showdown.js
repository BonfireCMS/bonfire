/* global showdown */

export function initialize(application) {
  const converter = new showdown.Converter();

  application.register("service:showdown", converter, { instantiate: false });
  application.inject("component", converter, "service:showdown");
  application.inject("controller", converter, "service:showdown");
  application.inject("route", converter, "service:showdown");
}

export default { title: "showdown", initialize };
