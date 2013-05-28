# grunt-init-chop-html - Project Scaffolding for a typical Chop HTML project

## Requirements

You must have [node](http://nodejs.org), [npm](https://npmjs.org), [Grunt](http://gruntjs.com/) and [grunt-init](http://gruntjs.com/project-scaffolding) installed. If you choose to use [Compass](http://compass-style.org), you must also have that installed.

## Installation

Clone this repository to your `~/.grunt-init` folder as `chop-html`

```git clone https://github.com/choppingblock/grunt-init-chop-html.git ~/.grunt-init/chop-html
```

## Usage

### To Scaffold a Project

If you have grunt-cli install and grunt-init installed via npm, you can use the command line tool `grunt-init` to scaffold your project with this template. `grunt-init` runs inside a project folder, it does not create the root folder for the project. When you run the `grunt-init` command, you'll be asked a series of questions about the project.

```cd my-project
grunt-init chop-html
npm install
```

### While Developing

You should be working on the /src folder. 

```grunt build
```

For continuously monitoring files

```grunt watch
```

### For Deployment

The deployed version exists in the /dist folder after running this task

```grunt distribute
```

## Features to add
* Optional qunit support
* ImageOptim task to distribute



