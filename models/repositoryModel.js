import { getDb } from'../db.js';
import { ObjectId } from 'mongodb';

const getRepositories = async () => {
  return await getDb().collection('repositories').find().toArray();
};

const getRepositoryById = async (id) => {
  return await getDb().collection('repositories').findOne({ _id: new ObjectId.createFromHexString(id) });
};

const getRepositoryByName = async (repositoryName) => {
  return await getDb().collection('repositories').findOne({ name: repositoryName });
};

export {
  getRepositories,
  getRepositoryById,
  getRepositoryByName,
};
