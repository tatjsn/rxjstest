const memoize = require('memoizee');

const lift = (f, ...props) => {
  const liftedF = () =>
    Promise.all(props.map(p => p()))
      .then(([...results]) => f(...results));
  return memoize(liftedF);
};

module.exports = { lift };
