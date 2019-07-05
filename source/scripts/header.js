
// Imports

import { stopGame } from './game';
import { showSummary } from './overlay';
import session from './session';

// Variables

const quitButton = document.querySelector( 'subhead button' );
const highestPoints = document.querySelector( '.high-score' );

// Export : Init

export function headerInit(){

  quitButton.addEventListener( 'click', event => {

    const numberCorrect = stopGame();
    headerScore( numberCorrect );

  });

  // Init

  headerScore( 0 );

}

// Export : Set High Score

export function headerScore( correct ){

  const store = session.get();

  if ( store ) {
    highestPoints.innerHTML = store.amount;
  } else {
    highestPoints.innerHTML = correct;
  }

}
