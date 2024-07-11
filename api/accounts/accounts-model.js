const db = require('../../data/db-config');

const getAll = (queries) => {
  const { limit, sortby, sortdir } = queries;
  const query = db('accounts')
    .orderBy(sortby || 'id', sortdir || 'asc')
    .limit(limit || 1000)
  return query;
}

const getById = id => {
  return db('accounts')
    .where({ id })
    .first();
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
