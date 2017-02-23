# generator-angular-typescript-sass
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Download Month](http://img.shields.io/npm/dm/generator-angular-typescript-sass.svg?style=flat-square)](https://www.npmjs.org/package/generator-angular-typescript-sass)

> Quick start webapp with AngualrJS, Typescript, sass.


## Features

Please see our [gulpfile](app/templates/gulpfile.js) for up to date information on what we support.

* Browserify with AngualrJS v1.6.2 and Angular-ui-router v1.1.36
* Typescript ^v2.1.6
* Built-in preview server with BrowserSync
* Automagically compile Sass
* Map compiled CSS to source stylesheets with source maps


## Installation

First, install [Yeoman](http://yeoman.io) and generator-angular-typescript-sass [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

Install Yeoman and generator:

```
npm install -g yo
npm install -g generator-angular-typescript-sass
```


Then generate your new project:

```
yo generator-angular-typescript-sass
```


Yeoman will create a project with the following structure:

    .
    ├── app
    │   │── components
    │   │── styles
    │   │── fonts
    │   │── images
    │   │── views
    │   │── main.ts
    │   └── index.html
    ├── node_modules
    ├── README.md
    ├── .gitignore
    ├── tsconfig.json
    ├── package.json
    └── gulpfile.js

## Getting Started

- DEV: `gulp watch`

- DEPLOY: `gulp release`


## License

MIT © [Leon Yip]()


<!--[npm-image]: https://badge.fury.io/js/generator-angular-typescript-sass.svg
[npm-url]: https://npmjs.org/package/generator-angular-typescript-sass
[travis-image]: https://travis-ci.org/leonyipwh/generator-angular-typescript-sass.svg?branch=master
[travis-url]: https://travis-ci.org/leonyipwh/generator-angular-typescript-sass
[daviddm-image]: https://david-dm.org/leonyipwh/generator-angular-typescript-sass.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/leonyipwh/generator-angular-typescript-sass-->
