// aka g
module.exports = x => new Promise(resolve => {
  console.log('computing D...');
  setTimeout(() => {
    console.log('computing D... DONE');
    resolve(`B->D (${x})`);
  }, 2000);
});
