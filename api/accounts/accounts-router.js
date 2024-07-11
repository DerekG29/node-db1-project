const router = require('express').Router()

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById
} = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await getById(id);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const id = await create(req.body);
    const newAccount = await getById(id);
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await updateById(id, req.body);
    const updated = await getById(id);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteById(id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
})

router.use((error, req, res, next) => { // eslint-disable-line
  console.error(error);
  res.status(500).json({ message: `${req.method} to /api/accounts${req.url} failed...` });
})

module.exports = router;
