# grunt-json2html

> Compile inline json file into static html from template

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-json2html --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json2html');
```

## The "json2html" task

### Overview
In your project's Gruntfile, add a section named `json2html` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json2html: {
      dev: {
        options: {
          templatesBaseDir: 'templates'
        },
        files: {
          'dev/': ['*.html']
        }
      }
    },
})
```

### Options

#### options.templatesBaseDir
Type: `String`
Default value: `',  '`

The folder where the html templates are.

### Usage Examples

#### Default Options
In this example, all the file .html in the base folder will be "compiled" in html file into the dev folder (with 1 to 1 mapping) using the templates
in the templates folder. 

```js
grunt.initConfig({
  json2html: {
    dev: {
        options: {
          templatesBaseDir: 'templates'
        },
        files: {
          'dev/': ['*.html']
        }
      }
  },
})
```

so the file index.html

```html
<html>
  <head>
      <title>grunt-json2html - Test Page</title>
  </head>
  <body id="landing-page">

    <!-- fillAndPaste template1 -->
    {
        "name": "Aler",
        "birthday": "14 Oct 1987",
        "plugin": "json2html",
        "passions": ["Ju Jitsu", "Aikido", "Origami"]
    }
    <!-- /fillAndPaste -->

    <!-- fillAndPaste template2 -->
    {
        "name": "Aler",
        "birthday": "14 Oct 1987",
        "passions": ["Ju Jistu", "Aikido", "Origami"]
    }
    <!-- /fillAndPaste -->

    <!-- fillAndPaste template3 --> <!-- /fillAndPaste -->

  </body>
</html>
```
given the 3 templates: templates/template1.html, templates/template2.html and templates/template3.html

```html
<h1><%= name %></h1>
<h2><%= birthday %></h2>
<p><%= plugin %></p>
<ul><% _.forEach(passions, function(passion) { %>
  <li><%= passion %></li><% 
}); 
%>
</ul>
```

```html
<div style="background-color:red">
  <h1><%= name %></h1>
  <h6><%= birthday %></h6>
  <p><%= plugin %></p>  
</div>
```

```html
<h1>Static template</h1>
<p>Maybe it's not so exciting to have static templates bat it can be useful!</p>
```

will be "compiled" into the following file (dev/index.html)

```html
<html>
  <head>
      <title>grunt-json2html - Test Page</title>
  </head>
  <body id="landing-page">

    <h1>Aler</h1>
    <h2>14 Oct 1987</h2>
    <p>json2html</p>
    <ul>
      <li>Ju Jitsu</li>
      <li>Aikido</li>
      <li>Origami</li>
    </ul>

    <div style="background-color:red">
      <h1>Aler</h1>
      <h6>14 Oct 1987</h6>
      <p></p> 
    </div>

    <h1>Static template</h1>
    <p>Maybe it's not so exciting to have static templates bat it can be useful!</p>

  </body>
</html>
```


## Release History
_(Nothing yet)_
