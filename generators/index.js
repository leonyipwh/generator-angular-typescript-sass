'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    console.log(yosay('Show me what you got!!!'))

    this.props = {};
  }

  prompting() {
    return this.prompt([
      {
      name: 'name',
      message: 'Your project name:',
    }]).then((props) => 
    {
      this.props.name = props.name;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }

    mkdirp('src/images');
    mkdirp('src/fonts');
  }

  writing() {
    // Gulpfile.js
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    // Package.json
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.name
      }
    );

    // tsconfig.json
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    // .gitignore
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // Readme
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        generatorName: this.props.name
      }
    );

    // src files
    this.fs.copy(
      this.templatePath('src/**/*.*'),
      this.destinationPath('src')
    );
  }

  install() {
    this.installDependencies({bower: false});
  }
  
};
