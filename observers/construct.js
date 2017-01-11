const { lift } = require('../utils/operators');

const c = require('../providers/c');
const d = require('../providers/d');
const cd = require('../providers/cd');
const e = require('../providers/e');
const ed = require('../providers/ed');

// This should be created automatically
module.exports = env => {
  // Units
  const A = () => Promise.resolve(env.a);
  const B = () => Promise.resolve(env.b);

  // Kinda observables
  const C = lift(c, A);
  const D = lift(d, B);
  const CD = lift(cd, C, D); // product
  const E = lift(e, CD);
  const ED = lift(ed, E, D); // product

  return { A, B, C, D, CD, E, ED };
};
