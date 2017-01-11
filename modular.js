const constructObservables = require('./observables/construct');

const observables = constructObservables({ a: 'hi', b: 'ho' });

console.log('wait...');
setTimeout(() => {
  console.log('go!');
  observables.ED().then(x => { console.log('returns', x); });
}, 1000);
