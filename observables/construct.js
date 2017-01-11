const { lift } = require('../utils/operators');

const c = require('../providers/c');
const d = require('../providers/d');
const cd = require('../providers/cd');
const e = require('../providers/e');
const ed = require('../providers/ed');

const selectorA = require('../selectors/a');
const selectorB = require('../selectors/b');

// If possible, this should be created automatically
module.exports = env => {
  // Units
  const A = () => Promise.resolve(selectorA(env));
  const B = () => Promise.resolve(selectorB(env));

  // Kinda observables
  const C = lift(c, A);
  const D = lift(d, B);
  const CD = lift(cd, C, D); // product
  const E = lift(e, CD);
  const ED = lift(ed, E, D); // product

  return { A, B, C, D, CD, E, ED };
};
