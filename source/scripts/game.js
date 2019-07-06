
// Imports

import { headerScore } from './header';
import { showSummary } from './overlay';
import session from './session';

// Variables : DOM

const container = document.querySelector( 'mole-game' );
const moles = Array.from( container.querySelectorAll( 'mole-wrapper' ) );
const domTimer = container.querySelector( 'mole-timer' );
const numberOfMoles = moles.length;

// Variables : Game Settings

const gameTime = 20;
const miniumShowTime = 1200;
const maxiumShowTime = 2000;

// Variables : Global References

const hashMap = [];
let timerAnimationTimeout;
let moleAnimatonTimeout;
let moleEventReference;
let numberCorrect = 0;

// Private : Cleanup

function cleanup() {

  // Stop Timeouts

  clearInterval( moleAnimatonTimeout );
  clearInterval( timerAnimationTimeout );

  hashMap.forEach( ( reference, i ) => {

    const mole = moles[ reference ];

    // Reset the board

    mole.setAttribute( 'data-active', false );
    mole.removeEventListener( 'click', moleEventReference );

    if ( i === hashMap.length - 1 ) hashMap.length = 0;

  });

}

// Private : Set Mole

function setMole( mole, reference, time ) {

  // Scoped : Mole Event

  moleEventReference = function moleEvent() {

    // Increase count correct

    numberCorrect++;

    // Clear timeout and restart the count

    mole.setAttribute( 'data-active', false );
    mole.removeEventListener( 'click', moleEvent );

  }

  // Set Active Mole with click event

  mole.setAttribute( 'data-active', true );
  mole.addEventListener( 'click', moleEventReference );
  hashMap.push( reference );

  // Recursively show moles based on random time

  setTimeout( ( currentMole, ref ) => {

    const hashReference = hashMap.findIndex( ( currentMole ) => currentMole === ref );

    currentMole.setAttribute( 'data-active', false );
    currentMole.removeEventListener( 'click', moleEventReference );
    hashMap.splice( hashReference, 1 );

  }, time, mole, reference );

}

// Private : Show Moles

function showMoles() {

  // Get Random Mole to show and Random time to show

  const moleToShow = Math.floor( Math.random() * numberOfMoles );
  const time = Math.random() * ( maxiumShowTime - miniumShowTime ) + miniumShowTime;
  const activeMole = moles[moleToShow];
  const isShowing = hashMap.findIndex( ( mole ) => mole === moleToShow );

  // Check to see if the current mole is upcoming mole

  if ( isShowing < 0 ) {

    setMole( activeMole, moleToShow, time );

    // Show a new Mole every second

    moleAnimatonTimeout = setTimeout( () => {
      showMoles();
    }, 1000);

  } else {

    showMoles();

  }

}

// Private : Gamer Timer

function timer() {

  // Recursively count down the timer for the game

  function counter( iterator ) {

    timerAnimationTimeout = setTimeout( () => {

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
