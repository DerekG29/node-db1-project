const db = require('../../data/db-config');

const getAll = async () => {
  return db('accounts');
}

const getById = async id => {
  return db('accounts')
    .where({ id });
}

const create = account => {
  return db('accounts')
    .insert(account);
}

const updateById = (id, changes) => {
  return db('accounts')
    .where({ id })
    .update(changes);
}

const deleteById = id => {
  return db('accounts')
    .where({ id })
    .del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
