
// Requires

require('styles/master.css');

// Polyfills

import '@babel/polyfill';

// Imports

import { appInit } from './overlay';

// Load

document.addEventListener( 'DOMContentLoaded', function() {

  appInit();

});
