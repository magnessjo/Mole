
// Variables

const sessionKey = 'whackamole';

// Set

function set( amount ) {

  const obj = {
    amount: amount,
    timestamp: new Date().getTime()
  }

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
