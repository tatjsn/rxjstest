const memoize = require('memoizee');

const tap = f => x => {
  f();
  return x;
};

// Pretend these are from imports

const f = x => Promise.resolve(`A->C (${x})`);
const g = x => Promise.resolve(`B->D (${x})`);
const h = x => Promise.resolve(`CD->E (${x})`);
const i = x => Promise.resolve(`CD->F (${x})`);

const c = a => () => a().then(f);
const d = b => memoize(() => b().then(g)
  .then(d =>
    new Promise(resolve => {
      console.log('computing D...');
      setTimeout(() => {
        console.log('computing D... DONE');
        resolve(d);
      }, 2000);
    })), { promise: true });

const cd = (c, d) => () => Promise.all([c(), d()]).then((x, y) => [x, y].join('+'));

const e = cd => () => cd().then(h).then(tap(() => { console.log('pass E'); }));
const ff = cd => () => cd().then(i).then(tap(() => { console.log('pass F'); }));

const ed = (e, d) => () => Promise.all([e(), d()]).then((x, y) => [x, y].join('+'));

// Setup

// Units
const A = () => Promise.resolve('hi');
const B = () => Promise.resolve('ho');

// Kinda observables
const C = c(A);
const D = d(B);
const CD = cd(C, D); // product
const E = e(CD);
const F = ff(CD);
const ED = ed(E, D); // product

// Execution

console.log('wait...');
setTimeout(() => {
  console.log('go!');
  ED().then(x => { console.log(x); });
}, 1000);
