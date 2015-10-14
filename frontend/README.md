# Bonfire Admin

The admin control panel for your blog

## Installation

```bash
$ npm install
$ bower install
$ npm start
```

Your blog should be availble at `http://localhost:4200`

## Hacking

The Admin portion of the app is an [ember](http://emberjs.com) app. We use
[ember-cli-mirage](http://ember-cli-mirage.com) to generate our data during test and
deveopment which makes things super easy. `scripts/test` will run all the ember
tests in a single run, or you can pass `--watch` to keep the serve alive.
