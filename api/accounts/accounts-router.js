const router = require('express').Router()

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById
} = require('./accounts-model');

const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware');

const postMW = [
  checkAccountPayload,
  checkAccountNameUnique
]

const putMW = [
  checkAccountId,
  checkAccountPayload,
]

router.get('/', async (req, res, next) => {
  try {
    const accounts = await getAll(req.query);
    res.json(accounts);
  } catch (error) {
    next({ status: 500, message: `GET to / failed...` });
  }
});

router.get('/:id', [checkAccountId], async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await getById(id);
    res.json(account);
  } catch (error) {
    next({ status: 500, message: `GET to /${id} failed...` });
  }
});

router.post('/', postMW, async (req, res, next) => {
  try {
    const id = await create(req.body);
    const newAccount = await getById(id);
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', putMW, async (req, res, next) => {
  const { id } = req.params;
  try {
    await updateById(id, req.body);
    const updated = await getById(id);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', [checkAccountId], async (req, res, next) => {
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
  const { status, message } = error;
  res.status(status).json({ message });
})

module.exports = router;
