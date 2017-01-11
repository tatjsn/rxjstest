const constructObservers = require('./observers/construct');

const observers = constructObservers({ a: 'hi', b: 'ho' });

console.log('wait...');
setTimeout(() => {
  console.log('go!');
  observers.ED().then(x => { console.log('returns', x); });
}, 1000);
