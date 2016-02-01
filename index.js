var fs = require('fs');
var Handlebars = require('handlebars');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var pdf = require('html-pdf');

var css = fs.readFileSync(__dirname + '/style.css', 'utf-8');
var template = fs.readFileSync(__dirname + '/resume.template', 'utf-8');

var resume = JSON.parse(fs.readFileSync(__dirname + '/resume.json', 'utf-8'));

postcss([autoprefixer])
  .process(css)
  .then(function(result) {
    return Handlebars.compile(template)({
      css: result.css,
      resume: resume
    });
  })
  .then(function(htmlResume) {
    fs.writeFile(__dirname + '/resume.html', htmlResume);
  });