

// Variables

const overlay = document.querySelector( 'overlay-element' );
const introduction = overlay.querySelector( 'introduction-element' );
const summary = overlay.querySelector( 'summary-element' );
const buttons = Array.from( overlay.querySelectorAll( 'button' ) );
const pointsTotal = overlay.querySelector( '.points-total' );

// Private : Cleanup Events

function actionCleanup() {

  buttons.forEach( ( button ) => {

    button.removeEventListener( 'click', startAction);

  });

}

// Private : Events Listeners

function actionEvents() {

  buttons.forEach( ( button ) => {

    button.addEventListener( 'click', startAction);

  });

}

// Private : Close Overlays and Start Game

function startAction() {

  overlay.style.display = 'none';
  introduction.style.display = 'none';
  actionCleanup();

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
