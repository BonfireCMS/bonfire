# Bonfire

Bonfire is a simple yet powerful platform for curating and managing your content.

## Technologies

 - Admin app: [ember.js](http://emberjs.com/)
 - Blog app: [express.js](http://expressjs.com/)
 - API [Node.js](nodejs.org) and [postgres](http://www.postgresql.org/)

## Installation

Let's go!

```shell
git clone https://github.com/BonfireCms/bonfire.git
cd bonfire
scripts/init
scripts/start
```

You should now see your blog running on `http://locahost:4982`

## Hacking

The Admin app and API/blog app are separated by `fronted`(admin) and
`backend`(api and blog app). Each app runs in a docker container during development
and test and also has the ability to run in docker containers during production
(best aproach). This allows for completely isolated builds.

- [Admin app instructions](https://github.com/BonfireCMS/bonfire/tree/master/frontend)
- [API instructions](https://github.com/BonfireCMS/bonfire/blob/master/backend/README.md)

## Contributing

> TODO: add content

## LICENSE

The MIT License (MIT)

Copyright (c) 2015 Dylan Foster <dylan947@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
