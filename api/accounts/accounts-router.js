const router = require('express').Router()

const { getAll } = require('./accounts-model');

router.get('/', (req, res, next) => {
  getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
