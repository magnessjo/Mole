
// Requires

require('styles/master.css');

// Polyfills

import '@babel/polyfill';

// Imports

import { appInit } from './overlay';
import { headerInit } from './header';

// Load

document.addEventListener( 'DOMContentLoaded', function() {

  // Initialize App

  appInit();
  headerInit();

});
