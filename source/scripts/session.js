
// Variables

const sessionKey = 'whackamole';

// Set

function set( amount ) {

  const obj = {
    amount: amount,
    timestamp: new Date().getTime()
  }

  // Add local storage reference for app with timestamp to check for relevant data if needed 

  localStorage.setItem( sessionKey, JSON.stringify( obj ) );

}

// Get

function get() {

  return JSON.parse( localStorage.getItem( sessionKey ) );

}

export default {
  set,
  get
}
