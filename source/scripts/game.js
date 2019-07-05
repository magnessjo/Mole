
// Imports

import { headerScore } from './header';
import { showSummary } from './overlay';

// Variables

const container = document.querySelector( 'mole-game' );
const moles = Array.from( container.querySelectorAll( 'mole-wrapper' ) );
const numberOfMoles = moles.length;

const gameTime = 30;
const miniumShowTime = 800;
const maxiumShowTime = 1600;

let currentActiveMole;
let timeoutAnimaton;
let numberCorrect = 0;

// Private : Cleanup

function cleanup() {

  clearInterval( timeoutAnimaton );
  cleanupMoleEvents( currentActiveMole );
  currentActiveMole.setAttribute( 'data-active', false );
  currentActiveMole = null;

}

// Private : Mole Events

function moleEvent() {

  numberCorrect++;
  clearInterval( timeoutAnimaton );
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

  const moleToShow = Math.floor( Math.random() * numberOfMoles );
  const time = Math.random() * ( maxiumShowTime - miniumShowTime ) + miniumShowTime;
  const activeMole = moles[moleToShow];

  if ( currentActiveMole != activeMole ) {

    currentActiveMole = activeMole;
    activeMole.setAttribute( 'data-active', true );
    addMoleEvents( activeMole );

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

  function counter( iterator ) {

    setTimeout( () => {

      iterator--;

      if ( iterator > 0 ) {
        counter( iterator );
      } else {
        stopGame();
      }

    }, 1000);

  }

  counter( gameTime );

}


// Export : Start Game

export function startGame() {

  showMoles();
  timer();

}

// Export : Stop Game

export function stopGame() {

  cleanup();
  headerScore( numberCorrect );
  showSummary( numberCorrect );

}
