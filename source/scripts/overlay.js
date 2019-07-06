
// Imports

import { startGame } from './game';

// Variables

const overlay = document.querySelector( 'overlay-element' );
const introduction = overlay.querySelector( 'introduction-element' );
const summary = overlay.querySelector( 'summary-element' );
const buttons = Array.from( overlay.querySelectorAll( 'button' ) );
const pointsTotal = overlay.querySelector( '.points-total' );

// Private : Cleanup Events

function actionCleanup() {

  // Remove events when overlay is closed 

  buttons.forEach( ( button ) => {

    button.removeEventListener( 'click', startAction);

  });

}

// Private : Events Listeners

function actionEvents() {

  // For each button in header, start game when clicked.

  buttons.forEach( ( button ) => {

    button.addEventListener( 'click', startAction);

  });

}

// Private : Close Overlays and Start Game

function startAction() {

  overlay.style.display = 'none';
  introduction.style.display = 'none';
  actionCleanup();
  startGame();

}

// Show Summary and add events

export function showSummary( amount = 0 ) {

  actionEvents();
  overlay.style.display = 'flex';
  summary.style.display = 'block';
  pointsTotal.innerHTML = amount;

}

// Init

export function appInit() {

  actionEvents();

}
