const router = require('express').Router()

const {
  getAll,
  getById,
  create,
} = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await getAll();
    res.json(accounts);
  } catch (error) {
    next({ ...error, message: 'Cannot GET accounts...' });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await getById(id);
    res.json(account);
  } catch (error) {
    next({ ...error, message: `Cannot GET account with id ${id}...` });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const id = await create(req.body);
    const newAccount = await getById(id);
    res.status(201).json(newAccount);
  } catch (error) {
    next({ ...error, message: 'Cannot POST new account...' });
  }
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
