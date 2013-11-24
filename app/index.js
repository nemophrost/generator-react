'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var ReactGenerator = module.exports = function ReactGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      skipMessage: options['skip-install-message']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ReactGenerator, yeoman.generators.Base);

ReactGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log('Out of the box I include HTML5 Boilerplate and jQuery.');
  }

  var prompts = [
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'React Addons',
        value: 'reactAddons',
        checked: true
      },{
        name: 'RequireJS Support',
        value: 'requireJS',
        checked: true
      },{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }]
    }/*,{
      type: 'list',
      name: 'cssPreprocessor',
      message: 'Would you like to include a CSS pre-processor?',
      choices: [{
        name: 'No',
        value: 'none'
      },{
        name: 'SCSS',
        value: 'scss'
      },{
        name: 'LESS',
        value: 'less'
      },{
        name: 'Stylus',
        value: 'stylus'
      }]
    }*/
  ];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.reactAddons = hasFeature('reactAddons');
    this.requireJS = hasFeature('requireJS');
    this.includeModernizr = hasFeature('includeModernizr');
    // this.cssPreprocessor = answers.cssPreprocessor;

    cb();
  }.bind(this));
};

ReactGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

ReactGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

ReactGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

ReactGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

ReactGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

ReactGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

ReactGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

ReactGenerator.prototype.mainStylesheet = function mainStylesheet() {
  // TODO: Add support for SCSS, LESS, and STYLUS
  this.copy('main.css', 'app/styles/main.css');
};

ReactGenerator.prototype.writeIndex = function writeIndex() {
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);
};

ReactGenerator.prototype.requirejs = function requirejs() {
  if (this.requireJS) {
    this.copy('app-require.jsx', 'app/jsx/app.jsx');
    this.copy('main-require.jsx', 'app/jsx/main.jsx');
  } else {
    this.copy('app.jsx', 'app/jsx/app.jsx');
  }
};


ReactGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/jsx');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
};
