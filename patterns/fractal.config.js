'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'WETO | component libary');
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'jeromehaas');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Tell Fractal where assets will live */
fractal.web.set('static.path', __dirname + '/public');

/* Tell Fractal where the build folder is */
fractal.web.set('builder.dest', __dirname + '/build');

/* Tell Fractal wich the default preview layout is */
fractal.components.set('default.preview', '@preview');