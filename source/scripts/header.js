
// Imports

import { stopGame } from './game';
import { showSummary } from './overlay';

// Variables

const quitButton = document.querySelector( 'subhead button' );


// Export : Init

export function headerInit(){

  quitButton.addEventListener( 'click', event => {

    stopGame();
    showSummary();
    headerScore();

  });

}

// Export : Set High Score

export function headerScore(){

}
