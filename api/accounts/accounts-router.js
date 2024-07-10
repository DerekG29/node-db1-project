const router = require('express').Router()

const {
  getAll,
  getById,
  create,
  updateById,
} = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await getAll();
    res.json(accounts);
  } catch (error) {
    next({ message: 'Cannot GET accounts...' });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await getById(id);
    res.json(account);
  } catch (error) {
    next({ message: `Cannot GET account with id ${id}...` });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const id = await create(req.body);
    const newAccount = await getById(id);
    res.status(201).json(newAccount);
  } catch (error) {
    next({ message: 'Cannot POST new account...' });
  }
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await updateById(id, req.body);
    const updated = await getById(id);
    res.json(updated);
  } catch (error) {
    next({ message: `Cannot PUT updates to account with id ${id}...` });
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json(err);
})

module.exports = router;
