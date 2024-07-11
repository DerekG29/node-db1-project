const { object, string, number } = require('yup');
const db = require('../../data/db-config');


const errors = {
  length: 'name of account must be between 3 and 100',
  required: 'name and budget are required',
  limit: 'budget of account is too large or too small',
  num: 'budget of account must be a number',
}

const schema = object({
  name: string()
    .trim()
    .min(3, errors.length)
    .max(100, errors.length)
    .required(errors.required),
  budget: number()
    .typeError(errors.num)
    .min(0, errors.limit)
    .max(1000000, errors.limit)
    .required(errors.required)
});

const checkAccountPayload = async (req, res, next) => {
  try {
    const payload = await schema.validate(req.body);
    req.body = payload;
    next();
  } catch (error) {
    const message = error.errors[0];
    next({ status: 400, message });
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  const account = await db('accounts').where({ name }).first();
  if (!account) {
    next();
  } else {
    next({ status: 400, message: 'that name is taken' });
  }
}

const checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  const account = await db('accounts').where({ id }).first();
  if (account) {
    req.account = account;
    next();
  } else {
    next({ status: 404, message: 'account not found' });
  }
} 

module.exports = { 
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}