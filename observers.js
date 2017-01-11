const Rx = require('rxjs');

const A = Rx.Observable.of('hi');

const B = Rx.Observable.of('ho');

const f = x => Promise.resolve(`A->C (${x})`);
const g = x => Promise.resolve(`B->D (${x})`);
const h = x => Promise.resolve(`CD->E (${x})`);
const i = x => Promise.resolve(`CD->F (${x})`);

const C = A.flatMap(f);

const D = B.flatMap(g)
  .flatMap(d =>
    new Promise(resolve => {
      console.log('computing D...');
      setTimeout(() => {
        console.log('computing D... DONE');
        resolve(d);
      }, 2000);
    }))
  .publishReplay()
  .refCount();

const CD = Rx.Observable.zip(C, D, (c, d) => [c, d].join('+'));

const E = CD.flatMap(h).do(() => { console.log('pass E'); });
const F = CD.flatMap(i).do(() => { console.log('pass F'); }); // dead code, won't run

const ED = Rx.Observable.zip(E, D, (e, d) => [e, d].join('+'));


console.log('wait...');
setTimeout(() => {
  console.log('go!');
  ED.subscribe(x => { console.log(x); });
}, 1000);
