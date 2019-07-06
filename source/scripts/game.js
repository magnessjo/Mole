
// Imports

import { headerScore } from './header';
import { showSummary } from './overlay';
import session from './session';

// Variables

const container = document.querySelector( 'mole-game' );
const moles = Array.from( container.querySelectorAll( 'mole-wrapper' ) );
const domTimer = container.querySelector( 'mole-timer' );
const numberOfMoles = moles.length;

const gameTime = 10;
const miniumShowTime = 800;
const maxiumShowTime = 1600;

let currentActiveMole;
let timerAnimation;
let timeoutAnimaton;
let numberCorrect = 0;

// Private : Cleanup

function cleanup() {

  // Stop Timeouts

  clearInterval( timeoutAnimaton );
  clearInterval( timerAnimation );

  // Remove Events

  cleanupMoleEvents( currentActiveMole );

  // Reset the board

  currentActiveMole.setAttribute( 'data-active', false );
  currentActiveMole = null;

}

// Private : Mole Events

function moleEvent() {

  // Increase count correct

  numberCorrect++;

  // Clear timeout and restart the count

  clearInterval( timeoutAnimaton );
  cleanupMoleEvents( currentActiveMole );
  currentActiveMole.setAttribute( 'data-active', false );
  showMoles();

}

// Private : Add Active Events

function addMoleEvents( mole ) {

  mole.addEventListener( 'click', moleEvent);

}

// Private : Cleanup Mole Events

function cleanupMoleEvents( mole ) {

  mole.removeEventListener( 'click', moleEvent);

}

// Private : Show Moles

function showMoles() {

  // Get Random Mole to show and Random time to show

  const moleToShow = Math.floor( Math.random() * numberOfMoles );
  const time = Math.random() * ( maxiumShowTime - miniumShowTime ) + miniumShowTime;
  const activeMole = moles[moleToShow];

  // Check to see if the current mole is upcoming mole

  if ( currentActiveMole != activeMole ) {

    // Set Active Mole with click event

    currentActiveMole = activeMole;
    activeMole.setAttribute( 'data-active', true );
    addMoleEvents( activeMole );

    // Recursively show moles based on random time

    timeoutAnimaton = setTimeout( () => {
      activeMole.setAttribute( 'data-active', false );
      cleanupMoleEvents( activeMole );
      showMoles();
    }, time);

  } else {

    showMoles();

  }

}

// Private : Gamer Timer

function timer() {

  // Recursively count down the timer for the game

  function counter( iterator ) {

    timerAnimation = setTimeout( () => {

      iterator--;

      if ( iterator > 0 ) {
        counter( iterator );
        domTimer.innerHTML = iterator;
      } else {
        domTimer.innerHTML = 0;
        stopGame();
      }

    }, 1000);

  }

  counter( gameTime );

}


// Export : Start Game

export function startGame() {

  numberCorrect = 0;
  showMoles();
  timer();
  domTimer.innerHTML = gameTime;

}

// Export : Stop Game

export function stopGame() {

  const store = session.get();

  cleanup();
  showSummary( numberCorrect );

  // Set localstorage session for highest points if avilable

  if ( store ) {

    if ( numberCorrect > store.amount ) {
      session.set( numberCorrect );
    }

  } else {

    session.set( numberCorrect );

  }

  headerScore( numberCorrect );

}
