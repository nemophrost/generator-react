# React App generator

Yeoman generator that scaffolds out a React web app.

## Features

* CSS Autoprefixing (new)
* Built-in preview server with LiveReload
* Automagically lint your scripts
* Automagically wire up your Bower components with [bower-install](https://github.com/stephenplusplus/grunt-bower-install).
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Mocha Unit Testing with PhantomJS
* Optional - Leaner Modernizr builds
* Optional - RequireJS AMD support

For more information on what `generator-react` can do for you, take a look at the [Grunt tasks](https://github.com/nemophrost/generator-react/blob/master/app/templates/_package.json) used in `package.json`.

## Getting Started

- Install: `npm install -g generator-react`
- Run: `yo react`
- Run `grunt` for building and `grunt serve` for preview


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework=<framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.

## Contribute

Submit a pull request and I'll see what I can do. Thanks!

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
