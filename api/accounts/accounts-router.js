const router = require('express').Router()

const { getAll, getById } = require('./accounts-model');

router.get('/', (req, res, next) => {
  getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(() => {
      next({ status: 500, message: 'Cannot GET accounts...' });
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  getById(id)
    .then(account => {
      res.json(account);
    })
    .catch(() => {
      next({ status: 500, message: `Cannot GET account with id ${id}` })
    });
});

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
