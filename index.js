const Rx = require('rxjs');

const A = new Rx.Subject();

const B = new Rx.Subject();

const f = x => Promise.resolve(`A->C (${x})`);

const g = x => Promise.resolve(`B->D (${x})`);

const h = x => Promise.resolve(`CD->E (${x})`);

const i = x => Promise.resolve(`CD->F (${x})`);

const C = A.flatMap(f);

const D = B.flatMap(g)
  .flatMap(gg =>
    new Promise(resolve => {
      console.log('computing D...');
      setTimeout(() => {
        console.log('computing D... DONE');
        resolve(gg);
      }, 2000);
    }))
  .publishReplay()
  .refCount();

const CD = Rx.Observable.zip(C, D, (c, d) => [c, d].join('+'));

const E = CD.flatMap(h).do(() => { console.log('pass E'); });
const F = CD.flatMap(i).do(() => { console.log('pass F'); }); // dead code, won't run

const ED = Rx.Observable.zip(E, D, (e, d) => [e, d].join('+'));

ED.subscribe(x => { console.log(x); });

A.next('hi');
B.next('ho');
